# PocketCam

A portable ESP32 based digital camera with local wireless photo sharing 

PocketCam is a handheld camera that captures real photographs on a physical shutter press, saves them to a microSD card, and hosts its own offline Wi-Fi gallery so friends can view and download photos directly from the camera without internet access or any cloud service 

## Status

Current stage: MVP in progress. See `CHANGELOG.md` for a running log of build decisions and problems encountered.

## Project structure

```
firmware/           ESP32 code, organised by build stage
hardware/            Schematics, pin mapping, component list and power system notes
simulation/          Wokwi simulation files and screenshots used before physical wiring
web-dashboard/       HTML, CSS and JS served by the camera for the local photo gallery
enclosure/           CAD files, renders and STL files for the handheld housing
documentation/       Project proposal, architecture notes, flowcharts and test results
images/              Photos of the prototype and final device
```

## Firmware folders

The `firmware/` directory keeps each build stage as a separate sketch rather than overwriting earlier work. This makes it possible to see how the project was built up:

- `camera-test/` — first working camera capture, no storage or networking yet
- `sd-storage/` — adds numbered JPEG storage to microSD
- `wifi-gallery/` — adds the local access point and web gallery
- `final-firmware/` — the current combined build, this is the one that runs on the actual device

If you are only looking for the current working version, go straight to `final-firmware/`.

## MVP scope

- Physical shutter button that reliably captures a photo on press
- Photos saved as numbered JPEG files to a microSD card
- Rechargeable battery operation with a power switch
- Onboard status indicator showing ready, capturing and saved states
- Local Wi-Fi access point hosted by the camera itself
- A simple web gallery page that lists photos and allows downloading them from a connected phone

Stretch goals and full project scope are documented in `documentation/project-proposal.docx`.

## Hardware

See `hardware/component-list/` for the full parts list and `hardware/pin-mapping/` for GPIO assignments.

## Author

Sangeetha Rajsubramanian (Stel)
sangeetha.rajsubramanian@gmail.com | linkedin.com/in/sangeetharajsubramanian
