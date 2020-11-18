# Devices

_Devices_ are instances of Drivers and represent a single \(usually physical\) object that is being controlled. A device is typically defined with an IP address and should be assigned to one or more Systems, so as to be controlled by that system’s Logic. Devices will inherit any settings defined for that device’s Driver.

Devices can be Started or Stopped. When Started, Engine will attempt to connect to that device and keep track of its online status. When Stopped, Engine will disconnect from that device and not send any commands to it.

