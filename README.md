# Alcove

A real time study space availability app for the PCL. Uses ultrasound sensors to map out availability of specific table and areas.

**Link to project demo:** 
https://drive.google.com/file/d/1q9-GUKTqSUneVAmu8vMDS2dQjQXpfy5W/view?usp=drive_link

## How It's Made:

**Tech used:** React Native, Expo, TypeScript, Arduino ESP-32, HC-SR04 Ultrasound Sensor

We used a React framework to develop the front end to match the Figma our design team used. Using the HC-SR04 to read distances calibrated by tables at the PCL, we loaded these values into Firebase where it was directly connected to the front end to update the color values by table depending on occupancy and state. 
