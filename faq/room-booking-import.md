# Room bookings

The PlaceOS room bookings module performs multiple roles:

* a cache of upcoming bookings for staff apps
* data for realtime analytics (room booked, in-use, empty, etc)
* data for room booking panel displays
* data for maps

A typical configuration consists of

* a system with a resource email addresses defined
* a unique instance of the PlaceOS Bookings module for that room (logic module)
* a shared instance of the PlaceOS Calendar module, for making requests to the calendaring system

The script below runs through the level zones and updates any systems with a
resource email address to the standard configuration.


## Prerequisites

Obtain the client id and secret from the domains tab in backoffice.
Then you can use any valid administration account credentials for that domain.

* create a calendar module that will be shared between all systems, note the module id
* add the Bookings driver to the system and note the driver id


## Room bookings import script

The only dependency is the PlaceOS crystal client

```yml

name: bookings-import
version: 1.0.0

# PlaceOS API integration
dependencies:
  placeos:
    github: placeos/crystal-client
    branch: master


```

The script below supports redistribution and customisation via the command line options
however you can also update the defaults and run it without any options

```ruby

require "option_parser"
require "placeos"

username = "support@place.tech"
password = "development"
client_id = "72a17dc552329402d68b6b02191c8f"
client_secret = "f1162a1dbe96a1dc15c33cdbe41bddb98dfd107b28e00d7aff306db60d454c8a6a507c"
place_domain = "https://placeos.place.tech"

calendar_module_id = "mod-FSqCVJUOP48"
bookings_driver_id = "driver-FTIqL3xTyeD"

# Command line options
OptionParser.parse do |parser|
  parser.banner = "Usage: #{PROGRAM_NAME} [arguments]"

  parser.on("-m MODULE_ID", "--module=MODULE_ID", "the calendar module id to be shared in all bookable spaces") do |mod|
    calendar_module_id = mod
  end

  parser.on("-b DRIVER_ID", "--booking=DRIVER_ID", "the bookings driver that we want in each room") do |driver|
    bookings_driver_id = driver
  end

  parser.on("-u USERNAME", "--user=USERNAME", "username to use for import") do |user|
    username = user
  end

  parser.on("-p PASSWORD", "--pass=PASSWORD", "password to use for import") do |pass|
    password = pass
  end

  parser.on("-d DOMAIN", "--domain=DOMAIN", "the domain of the PlaceOS server") do |dom|
    place_domain = dom
  end

  parser.on("-c CLIENT", "--client=CLIENT", "placeos application client") do |c|
    client_id = c
  end

  parser.on("-s SECRET", "--secret=SECRET", "placeos application secret") do |s|
    client_secret = s
  end

  parser.on("-h", "--help", "Show this help") do
    puts parser
    exit 0
  end
end

# Ignore certificate errors (where self-signed certificate is in use)
class OpenSSL::SSL::Context::Client
  def initialize(method : LibSSL::SSLMethod = Context.default_method)
    super(method)

    self.verify_mode = OpenSSL::SSL::VerifyMode::NONE
    {% if compare_versions(LibSSL::OPENSSL_VERSION, "1.0.2") >= 0 %}
      self.default_verify_param = "ssl_server"
    {% end %}
  end
end

# Configure the PlaceOS client
client = PlaceOS::Client.new(place_domain,
  email: username,
  password: password,
  client_id: client_id,
  client_secret: client_secret
)

system_count = 0
created = 0
updated = 0
errors = 0
puts "grabbing level zones..."

# Grab all the zones
zones = client.zones.search(limit: 1000, tags: "level")
puts "found #{zones.size} zones"

zones.each do |zone|
  puts "checking systems in #{zone.name}..."

  # Grab the systems in each zone
  systems = client.systems.search(limit: 1000, zone_id: zone.id)
  system_count += systems.size

  # Make sure all the systems have the calendar module and a bookings driver - if email set
  systems.each do |system|
    next unless system.email.presence

    if !system.modules.includes?(calendar_module_id)
      system.modules << calendar_module_id
      begin
        client.systems.update(
          id: system.id,
          version: system.version,
          modules: system.modules,
        )
        updated += 1
      rescue error
        errors += 1
        puts error.inspect_with_backtrace
      end
    end

    # check if the any of the modules are a Bookings module
    modules = system.modules.dup
    modules.delete(calendar_module_id) # we can safely ignore this
    module_found = false
    modules.each do |mod_id|
      if client.modules.fetch(mod_id).driver_id == bookings_driver_id
        module_found = true
        break
      end
    end

    # Add the module to the system
    if !module_found
      module_id = client.modules.create(
        driver_id: bookings_driver_id,
        control_system_id: system.id,
      ).id

      begin
        client.modules.start(module_id)
      rescue
        puts "failed to start #{module_id}"
        errors += 1
      end

      created += 1
    end
  end
end

puts "\nchecked #{system_count} systems,\nupdated #{updated} systems,\ncreated #{created} modules."

if errors == 0
  puts "success"
else
  puts "#{errors} errors"
end

```
