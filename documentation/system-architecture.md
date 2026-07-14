# ✦ PocketCam System Architecture 📷🐻

PocketCam is divided into five main subsystems:

- image capture
- user interface
- storage
- wireless sharing
- portable power

## Overall System Architecture

```mermaid
flowchart LR
    USER[User 🐰] -->|presses shutter| BUTTONS[Physical Buttons]
    BUTTONS --> CONTROLLER[ESP32-CAM Controller]

    CAMERA[OV2640 Camera] -->|image frame| CONTROLLER
    CONTROLLER -->|status and preview data| DISPLAY[1.28 inch Round TFT]
    CONTROLLER -->|JPEG files| STORAGE[microSD Card]
    CONTROLLER -->|sound signal| BUZZER[Active or Passive Buzzer]
    CONTROLLER -->|status signal| LED[Status LED]

    CONTROLLER --> WIFI[Local Wi-Fi Access Point]
    WIFI --> WEB[Embedded Web Gallery]
    WEB --> PHONE[Friends' Phones 📱]

    BATTERY[3.7 V LiPo Battery] --> CHARGER[Charging and Protection Module]
    CHARGER --> REGULATOR[Voltage Regulation]
    REGULATOR --> SWITCH[Power Switch]
    SWITCH --> CONTROLLER
    SWITCH --> DISPLAY
```

---

## ✦ Main Controller Subsystem

The ESP32-CAM acts as the central controller of PocketCam.

It is responsible for:

- controlling the OV2640 camera
- processing shutter button input
- capturing JPEG images
- generating unique filenames
- saving photographs to the microSD card
- updating the round TFT display
- controlling the buzzer and status indicators
- creating the local Wi-Fi network
- hosting the offline web gallery

```mermaid
flowchart TD
    INPUTS[Buttons and User Inputs] --> ESP[ESP32-CAM]
    CAM[OV2640 Camera] --> ESP
    ESP --> TFT[Round TFT Display]
    ESP --> SD[microSD Storage]
    ESP --> AUDIO[Buzzer]
    ESP --> STATUS[Status LED]
    ESP --> NETWORK[Wi-Fi and Web Server]
```

---

## ✦ Image Capture Architecture

```mermaid
flowchart LR
    SUBJECT[Scene or Friends 🌷] --> CAMERA[OV2640 Camera]
    CAMERA --> FRAME[Image Frame Buffer]
    FRAME --> ESP[ESP32-CAM Processing]
    ESP --> JPEG[JPEG Image]
    JPEG --> SD[microSD Card]
    JPEG --> PREVIEW[Display Confirmation]
```

The full rectangular JPEG image is stored on the microSD card.

The round display may show:

- a cropped preview
- a reduced preview
- capture status
- the most recent photo
- photo number and camera settings

---

## ✦ Display and User Interface Architecture

```mermaid
flowchart TD
    SHUTTER[Shutter Button] --> ESP[ESP32-CAM]
    MODE[Mode Button] --> ESP
    LEFT[Left Button] --> ESP
    RIGHT[Right Button] --> ESP
    BACK[Back Button] --> ESP

    ESP --> TFT[1.28 inch Round TFT]
    ESP --> BUZZER[Buzzer]
    ESP --> LED[Status LED]

    TFT --> STARTUP[Startup Screen]
    TFT --> READY[Ready or Preview Screen]
    TFT --> CAPTURE[Capturing Screen]
    TFT --> SAVED[Photo Saved Screen]
    TFT --> MENU[Settings Menu]
    TFT --> ERROR[Error Message]
```

### Planned user interface screens

```text
╭────────────────────╮
│    POCKETCAM 📷    │
│    starting...     │
╰────────────────────╯
```

```text
╭────────────────────╮
│                    │
│    LIVE PREVIEW    │
│                    │
│  AUTO     IMG 024  │
╰────────────────────╯
```

```text
╭────────────────────╮
│   PHOTO SAVED ✦    │
│                    │
│   IMG_0025.JPG     │
╰────────────────────╯
```

---

## ✦ Storage Architecture

```mermaid
flowchart TD
    CAPTURE[Captured JPEG] --> NAME[Generate Unique Filename]
    NAME --> FOLDER[Select Album or Session Folder]
    FOLDER --> WRITE[Write File to microSD]
    WRITE --> VERIFY{Write Successful?}

    VERIFY -- Yes --> COUNTER[Update Photo Counter]
    VERIFY -- No --> ERROR[Delete Incomplete File and Show Error]
```

### Planned storage structure

```text
microSD/
│
├── photos/
│   ├── IMG_0001.JPG
│   ├── IMG_0002.JPG
│   └── IMG_0003.JPG
│
├── albums/
│   ├── outing_001/
│   └── outing_002/
│
└── system/
    └── photo_counter.txt
```

Session albums are a planned additional feature. The first version may store all photographs inside one folder.

---

## ✦ Offline Wireless Sharing Architecture

```mermaid
flowchart LR
    ESP[ESP32-CAM] --> AP[PocketCam Wi-Fi Access Point]
    AP --> PHONE1[Phone 1 📱]
    AP --> PHONE2[Phone 2 📱]
    AP --> PHONE3[Phone 3 📱]

    ESP --> SERVER[Embedded Web Server]
    SERVER --> GALLERY[Photo Gallery]
    GALLERY --> VIEW[View Photos]
    GALLERY --> DOWNLOAD[Download Photos]
```

PocketCam will host its own Wi-Fi network.

Example network:

```text
Wi-Fi name: PocketCam
Internet: Not required
Gallery address: local PocketCam webpage
```

Users will be able to:

- connect directly to PocketCam
- open the local web gallery
- view saved photographs
- download selected photographs
- use the system without mobile data or cloud services

---

## ✦ Power Architecture

```mermaid
flowchart LR
    USB[USB-C Input] --> CHARGE[TP4056 Charging Module]
    BATTERY[3.7 V LiPo Battery] --> CHARGE
    CHARGE --> PROTECTION[Battery Protection]
    PROTECTION --> REGULATION[Voltage Regulation]
    REGULATION --> SWITCH[Main Power Switch]
    SWITCH --> ESP[ESP32-CAM]
    SWITCH --> TFT[Round TFT Display]
    SWITCH --> OTHER[Buzzer and Indicators]
```

The final power path will only be confirmed after measuring the actual current requirements of:

- camera capture
- round TFT display
- Wi-Fi operation
- microSD writing
- buzzer and flash operation

The first prototype will be powered through the ESP32-CAM USB base.

---

## ✦ Software Architecture

```mermaid
flowchart TD
    MAIN[Main Firmware Loop] --> FSM[Finite State Machine]

    FSM --> CAMMGR[Camera Manager]
    FSM --> SDMGR[Storage Manager]
    FSM --> DISPLAYMGR[Display Manager]
    FSM --> BUTTONMGR[Button Manager]
    FSM --> WEBMGR[Wi-Fi Gallery Manager]
    FSM --> POWERMGR[Power Manager]
    FSM --> AUDIOMGR[Buzzer Manager]

    CAMMGR --> DRIVER[OV2640 Driver]
    SDMGR --> SD[microSD File System]
    DISPLAYMGR --> TFT[GC9A01 Display Driver]
    WEBMGR --> SERVER[Embedded Web Server]
```

### Planned firmware modules

```text
firmware/
│
├── PocketCam.ino
├── camera_manager
├── display_manager
├── storage_manager
├── button_manager
├── wifi_gallery
├── buzzer_manager
├── power_manager
└── pin_config
```

---

## ✦ Data Flow Summary

```mermaid
sequenceDiagram
    participant U as User
    participant B as Shutter Button
    participant E as ESP32-CAM
    participant C as OV2640 Camera
    participant S as microSD Card
    participant D as TFT Display

    U->>B: Press shutter
    B->>E: Capture request
    E->>D: Show capturing
    E->>C: Request image frame
    C-->>E: Return JPEG frame
    E->>S: Save numbered JPEG
    S-->>E: Confirm write
    E->>D: Show photo saved
    E-->>U: Play shutter sound
```

---

## ✦ Architecture Constraints

The design must account for:

- limited available GPIO pins on the ESP32-CAM
- camera and microSD pin usage
- memory required for camera frame buffers
- display bandwidth and preview frame rate
- power spikes during Wi-Fi and image capture
- microSD write speed
- limited battery capacity
- possible conflicts between display, camera and storage interfaces

The exact pin map will only be finalised after the round display and ESP32-CAM are physically tested.

---

## ✦ Current Architecture Status

```text
╭────────────────────────────╮
│                            │
│     POCKETCAM SYSTEM       │
│       ARCHITECTURE         │
│                            │
│      planned ✦ 🐻         │
│                            │
╰────────────────────────────╯
```

Current stage:

- system concept completed
- major subsystems identified
- components ordered
- GPIO mapping pending
- power system pending validation
- physical integration pending
