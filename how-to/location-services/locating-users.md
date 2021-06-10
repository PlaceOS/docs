---
title: Locating Users on a Network
description: 
sidebar_position: 5
---
<!-- This HAS NOT BEEN EDITED
Please see original at https://docs.google.com/document/d/14XIJbnvJBg23Qc_oc3JN5Ub0geETTSmTWr8Sd8YryLM/edit -->



Using existing infrastructure, there is typically enough data available to accurately locate staff. 
Wireless networks provide a rough indication of location.
Cabled infrastructure accurately shows who is sitting at individual desk locations.

You can also augment this with sensors as required. 
Sensors only show desk usage and will need to fall back to Wi-Fi for staff location.

![Drawing](https://docs.google.com/drawings/d/12345/export/png)


### **The Lookup Process:**

1. Lookup the username or email address of the person in question (staff search)
2. Grab the device mappings for that user (as per the diagram above)
3. Check if any of those devices are plugged in to a switch port (or have a desk reserved)
4. If not, fall back to wireless lookup of username, email or wireless MAC address


## **Desk Locating Requirements** {#desk-locating-requirements}

*   Switch IP addresses
*   SNMP or SSH service enabled on the switch (SSH preferred as it's easier to troubleshoot and secure)
*   A list of switch ports to desk mappings
*   A method for pairing staff to their devices

Most switches expose a SNMP service for locating details of port usage and the devices connected to each port.
This is an [industry standard](https://tools.ietf.org/html/rfc4293) common to most network hardware manufacturers.
CISCO switches support SSH and PlaceOS supports [SSHv2](http://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html) for secure data transfer.


#### **Laptop Docking Stations** {#laptop-docking-stations}

Desk locating relies on device MAC addresses to identify staff as they move around a building.
Docking stations often sit between the laptop and the switch.
We need to ensure that the MAC address exposed by the docking station is unique to each staff member.

All commercial docking solutions offer a method for passing on a unique MAC, or do this by default. 
Two of the more common docking solutions are HP (BIOS or EFI configuration) and [Displaylink](http://www.displaylink.com/products/universal-docking-stations) USB docks (Dell, Lenovo, Fujitsu, Targus, Kensington, HP and Toshiba among others).

DisplayLink provides a PowerShell [script](https://drive.google.com/a/room.tools/file/d/1ie_cEe0tP4tmYvhw1vh3YXO45XSFIA3Y/view?usp=sharing) to automate the configuration which can be deployed via SCCM.
<!-- Should this be capturing_user_devices.md ?-->

[https://support.displaylink.com/knowledgebase/articles/613455-how-to-configure-displaylink-ethernet#macclone](https://support.displaylink.com/knowledgebase/articles/613455-how-to-configure-displaylink-ethernet#macclone)

This [alternative script](https://drive.google.com/a/room.tools/file/d/12VqNiXpX_WUoKtrnW-w06mG-dTkAPLbw/view?usp=sharing) provides detailed logging which can be useful when deploying.


### **User Device Discovery** {#user-device-discovery}

We automate the mapping of laptops and phones to staff.

This is a two step process.



1. Firstly we need to discover the IP addresses of the devices in use by a user
2. Once we have the IP address we need to find the associated MAC addresses

This maintains a mapping of MAC addresses to user accounts which can be used in conjunction with port usage to determine the location of users.


#### **User Account To IP Address Mapping** {#user-account-to-ip-address-mapping}

There are multiple ways to obtain this information and these can be used simultaneously.

*   Users connecting to the staff application
*   Users logging on to their machines triggering an event on the Windows domain controller
*   Users connecting to a file share or print server
*   Custom tray application locating the logged in user, any IP address changes and associated MAC addresses


#### **Windows Domain Controller** {#windows-domain-controller}

The Windows domain controller is used to authenticate users as they log onto a device. 
This would typically be a laptop, desktop computer or thin client.

By auditing credential [validation events](https://technet.microsoft.com/en-us/library/cc787567(v=ws.10).aspx) it's possible to query these logs to inform PlaceOS of the user account and the corresponding IP address associated with the event.

[https://technet.microsoft.com/en-us/library/dd772679%28v=ws.10%29.aspx](https://technet.microsoft.com/en-us/library/dd772679%28v=ws.10%29.aspx)


#### **File Share Or Print Server** {#file-share-or-print-server}

Similar to the Windows domain controller method, audit logging can be enabled for file share access events.

[https://technet.microsoft.com/en-us/library/dn311489%28v=ws.11%29.aspx](https://technet.microsoft.com/en-us/library/dn311489%28v=ws.11%29.aspx)

[https://blogs.technet.microsoft.com/mspfe/2013/08/26/auditing-file-access-on-file-servers/](https://blogs.technet.microsoft.com/mspfe/2013/08/26/auditing-file-access-on-file-servers/)


### **IP Address To Mac Address Resolution** {#ip-address-to-mac-address-resolution}

At this point we have a user account and an IP address. 
We need to lookup the MAC address associated with the IP address so we can associate the user to the MAC address / device.



*   PlaceOS will communicate with the switches over UDP port 161 or TCP port 22
*   The switches may communicate to PlaceOS over UDP port 162 \
(Not required for SSH connections)


#### **Switch DHCP Snooping Table** {#switch-dhcp-snooping-table}

We query DHCP snooping tables on level 2 switches as they maintain a list of DHCP allocated IP addresses and the MAC addresses of assigned devices.

DHCP snooping is a [security feature](http://packetpushers.net/five-things-to-know-about-dhcp-snooping/) and enabling it has additional advantages beyond user locating.

If DHCP snooping is undesirable, **DHCP Gleaning** can be used instead.


## **Example PowerShell Scripts** {#example-powershell-scripts}

This covers the basics of user discovery using a domain controller. 
A third-party machine can be configured to query server logs remotely - see the detailed scripts for how this is achieved:

[https://github.com/acaprojects/ruby-engine/blob/master/docs/capturing_user_devices.md](https://github.com/acaprojects/ruby-engine/blob/master/docs/capturing_user_devices.md)

It's possible to use additional events and modify scripts as required for security compliance.

For more details on how this is implemented please see our detailed [configuration guide](https://docs.google.com/document/d/1WJOAMgs8ZppFrIVzlkTWDiV8vgZ_KJf766XSpv9nnzw/edit#heading=h.nocikac03i2d).


## **Wireless Location** {#wireless-location}

There are multiple methods for locating users on the wireless network and ACA has integrations for various systems.

*   [CISCO CMX](https://www.cisco.com/c/en/us/solutions/enterprise-networks/connected-mobile-experiences/index.html) 
*   [CISCO Meraki](https://meraki.cisco.com/solutions/location-analytics) 
*   [HP Aruba (Analytics and Location Engine](https://www.arubanetworks.com/assets/ds/DS_ALE.pdf)
*   [Ruckus SPoT](https://www.ruckuswireless.com/products/smart-wireless-services/location-services)
*   [Huawei WLAN positioning](http://e.huawei.com/en/marketing-material/onlineview?materialid=%7B2a91d39b-bb1f-4636-8cec-e6b774702448%7D) 
*   [Microsoft FindMe](https://www.microsoft.com/itshowcase/Article/Content/808/Creating-a-personalized-experience-in-the-modern-workplace-with-Windows-10)

Depending on the wireless solution in place and it’s level of integration we may still need server notification scripts even in a wireless only environment.

*   CISCO CMX for instance can provide usernames when users are connected to the wireless, if configured to do so. 
*   Microsoft FindMe will always provide a username 
*   Huawei provides raw RSSI values, IP and MAC addresses. 
ACA manages floor fingerprinting and estimating location based on these values


## **Shared Desktop Configuration** {#shared-desktop-configuration}

For monitoring desktop computer usage, such as locating a computer in a call center, you need to capture log-off events. 
You can only get these from the machine itself.

::: note  
This is a simplified overview of data extraction from auditing events


### **Enable Auditing In** {#enable-auditing-in}

![Alt text](images/image2.png "image tool tip")



### **User Notification Script** {#user-notification-script}

::: note
This script can be modified to filter notifications for a subset of users, such as those in a specific domain or IP range.

Filename: `user_ip.ps1`

```
param (
    [Parameter(Mandatory=$true)][string]$ip,
    [Parameter(Mandatory=$true)][string]$username,
    [Parameter(Mandatory=$true)][string]$domain
)
$postParams = ConvertTo-Json @{module="LocateUser";method="lookup";args=@(,@($ip,$username,$domain))}
Invoke-WebRequest -Uri http://yourcompany.com/control/api/webhooks/trig-O6AXyP7jb5/notify?secret=f371579324eb56659b2f0b2c6f43d617 -Method POST -Body $postParams -ContentType "application/json"
```


### **Create An Action For The Event** {#create-an-action-for-the-event}

![Alt text](images/image3.png "image tool tip")


1. Create a basic task that runs an application (click through next in the wizard)
    *   Program / Script: `PowerShell`
    *   Arguments: `-ExecutionPolicy Bypass -windowstyle hidden c:\aca-apps\user_ip.ps1 -ip $(ip) -username $(username) -domain $(domain)`
2. Open Task Scheduler -> Event Viewer Tasks -> (task name)
3. Export the task
4. Add the `ValueQueries` (below, [more details](https://blogs.technet.microsoft.com/otto/2007/11/09/reference-the-event-that-triggered-your-task/))
5. Delete the task
6. Import the edited task


```
<Triggers>
  <EventTrigger>

    <!-- Add this section: -->
    <ValueQueries>
      <Value name="ip">Event/EventData/Data[@Name='IpAddress']</Value>
      <Value name="username">Event/EventData/Data[@Name='TargetUserName']</Value>
      <Value name="domain">Event/EventData/Data[@Name='TargetDomainName']</Value>
    </ValueQueries>
    <!-- ================= -->
    <Subscription><!-- Filter on logon types --></Subscription>

  </EventTrigger>
</Triggers>
