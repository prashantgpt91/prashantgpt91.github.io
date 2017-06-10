---
author: prashant
comments: true
date: 2016-12-06 07:42:44+00:00
layout: post
redirect_from: /2016/12/quadcopter
slug:
title: Quadcopter with Pixhawk
wordpress_id: 1074
tags:
- business
- hardware
- drones
---
Here's a hands on a Quadcopter by our expert Logesh - Hardware Engineer




![][1]

The primary aim was to get a hands on a Quadcopter and find ways to add features to it and add applications.

Parts and software used:

1. Pixhawk Flight controller.
2. Vibration Damper for Pixhawk/APM.
3. Buzzer for Pixhawk.
4. Safety switch for Pixhawk.
5. GPS module (Ublox Neo 7m or Neo 8m with compass)
6. 450mm DJI type Glass fiber frame.
7. 4 PC. 1000 kv Brushless motors.
8. 4 PC. 10x4.5 Propellers. (Extra Spares may be required incase you plan to break them)
9. Radio transmitter and receiver. (at least 6 channel, anything will work)
10. 3S Li-Pol battery 11.1 V 3300 mAh. (more mAH = more flight time and weight)
11. Battery strap. (to hold battery tight)
12. 2S — 4S Power supply module with Voltage and current measurement. (3DR clone)
13. 4PC. ESC for the motors.
14. 435 MHz Telemetry kit.(For wireless monitoring and control when the Quad flies.)
15. Windows PC running Mission Planner software.

### Flying the&nbsp;Quad

![][2]

Flying in&nbsp;action

And it flies..but not right away, we had to do a series of calibrations and manual troubleshooting to make that hover.. we will cover that here.

Following standard procedures were performed according to the guides supplied by Ardupilot Documentation.

1. Assemble the F450 frame(PCB version) — <https: www.youtube.com="" watch?v="pUTHIL_Xfcc">
2. Connect with pixhawk — <http: ardupilot.org="" copter="" docs="" common-pixhawk-wiring-and-quick-start.html=""> and <http: ardupilot.org="" copter="" docs="" connect-escs-and-motors.html="">
3. Install GPS + Compass <http: ardupilot.org="" copter="" docs="" common-installing-3dr-ublox-gps-compass-module.html="">
4. Load the Firmware. In this case, ArduCopter <http: ardupilot.org="" copter="" docs="" common-loading-firmware-onto-pixhawk.html="">
5. Once the firmware is loaded, we can proceed with the calibrations shown here in the link. <http: ardupilot.org="" copter="" docs="" common-loading-firmware-onto-pixhawk.html="">

Listing out all the calibrations we did, Just in case.

1. Accelerometer calibration.
2. ESC calibration.
3. Compass calibration with external compass.
4. RC calibration.
5. Battery monitor calibration. — look here <http: ardupilot.org="" copter="" docs="" common-power-module-configuration-in-mission-planner.html#enable-voltage-and-current-sensing="">

### Troubleshooting and&nbsp;Tips

![][3]

Pixhawk mounted on a F450&nbsp;frame

We faced certain problems while following all the procedures above. Just listing them out incase. If you face the same issue, you can get answers here.

1. The autopilot behaves weird if it is prone to vibrations. using a vibration damper (<http: www.dronetrest.com="" t="" how-to-build-the-pixhawk-apm-vibration-damping-mount="" 1016="">)to mount pixhawk is recommended.
2. Disable failsafe if you are confident and flying indoors for testing.
3. The hovering throttle should be around 50 % of the total throttle in the Radio Transmitter. if this is higher, then putting the flight controller in loiter mode will bring it down and eventually land and disarm.
4. Always arm in stabilise mode if you are a beginner.
5. All auto modes needs GPS. to be precise. it needs 3D GPS fix with at least 6 satellites, and HDOP less than 1.4.
6. Prevent compass interference by installing it well above the propeller level using GPS mount. if you are using internal compass, do CompassMot calibration for more interference compensation.
7. When doing first flight test. be sure you are outdoor and area is clear of people and children.
8. If the battery monitor is not calibrated properly, Ardupilot may activate battery low alarms early. this can be fixed by performing manual calibration with battery discharged to 10.5v(Battery low limit). you may run the motors without the propellers for sometime to bring down the battery voltage.
9. Always secure all components to the frame firmly with a tie or double side foam tape. any loose peripheral will cause vibrations and unexpected behaviour.
10. Before fitting the propellers, be sure the ESC are calibrated and the motors are spinning in the right direction.

[1]: https://cdn-images-1.medium.com/max/800/1*PxPU63sJ2UEE3EnowNOXcw.jpeg
[2]: https://cdn-images-1.medium.com/max/800/1*v6e1LJBcozxx-lo2i5f8bQ.gif
[3]: https://cdn-images-1.medium.com/max/800/1*0R2gkKoa60CYpUsVWah6yQ.jpeg

  </http:></http:></http:></http:></http:></http:></http:></https:>
