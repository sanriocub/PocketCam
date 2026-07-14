# ✦ PocketCam Firmware Flowchart 📷🐻

```mermaid
flowchart TD
    A([Power On]) --> B[Show Startup Screen]
    B --> C[Initialise Camera]
    C --> D{Camera Working?}
    D -- Yes --> E[Initialise microSD Card]
    D -- No --> F[Show Camera Error]
    F --> C
    E --> G{SD Card Detected?}
    G -- Yes --> H[Display Ready Screen]
    G -- No --> I[Show SD Card Error]
    I --> E
    H --> J{Shutter Pressed?}
    J -- Yes --> K[Capture Photo]
    J -- No --> H
    K --> L[Save Photo to microSD]
    L --> M{Photo Saved?}
    M -- Yes --> N[Show Photo Saved]
    M -- No --> O[Show Storage Error]
    N --> H
    O --> H
```
