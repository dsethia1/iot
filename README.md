# ALCOVE

ALCOVE is an Expo (React Native) application that connects to a Firebase Realtime Database to display distance and occupancy data streamed from an ESP32. This README explains how to install the project, run it, and connect it to your IoT setup.

---

## Installation

### 1) Clone the repository
```bash
git clone <https://github.com/dsethia1/iot.git>
cd iot
```

### 2) Install Dependencies
```bash
npm install
npm install firebase
npm install -g expo-cli
```
### 3) Run Expo
```bash
npx expo start
```

**Link to project demo:** https://drive.google.com/file/d/1q9-GUKTqSUneVAmu8vMDS2dQjQXpfy5W/view?usp=drive_link

## How It's Made:

## Tech Stack

- **Mobile:** React Native, Expo  
- **Language:** TypeScript
- **Hardware:** Arduino ESP32, HC-SR04 Ultrasonic Sensor  
- **Backend:** Firebase
- 
We used React Native with Expo to develop the mobile front end, implementing the UI based on the Figma designs created by our design team. On the hardware side, we used an HC-SR04 ultrasonic sensor connected to an ESP-32 to measure table distance data. These readings were calibrated specifically for the PCL tables and then uploaded to Firebase. The front end reflected to these Firebase updates (via firebase.js) and dynamically adjusted the UI in [section].tsx, updating each table’s color/state in real time based on occupancy.
