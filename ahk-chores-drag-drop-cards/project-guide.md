# DroneMap Project Guide

## Project Overview

DroneMap is a hybrid mobile/web application built with TypeScript, PlayCanvas (for 3D visualization), Leaflet (for 2D maps), and Capacitor (for mobile deployment). It serves as a control and visualization interface for drone operations, particularly for carrier drones equipped with scanners and peripherals. The app displays live drone telemetry, allows command execution, and is being extended to include a Workflow Composer for assembling automated processes.

The project integrates with a backend API (running on `localhost:8000`) for telemetry data, commands, and potentially process execution via a system manager.

## Architecture

### Technology Stack
- **Frontend Framework**: TypeScript with Vite for building
- **3D Engine**: PlayCanvas for drone visualization in 3D space
- **2D Mapping**: Leaflet for mini-map overlays
- **Mobile**: Capacitor for Android/iOS deployment
- **Build Tool**: Vite
- **Dependencies**: PlayCanvas, Leaflet, Capacitor plugins

### Project Structure
```
DroneMap/
├── src/                          # Main TypeScript source
│   ├── Commands.ts              # Command UI and logic
│   ├── CommandLoader.ts         # Loads command config from backend
│   ├── CommandTypes.ts          # TypeScript interfaces for commands
│   ├── commands.json            # Local command definitions (fallback)
│   ├── Drones.ts                # 3D drone rendering logic
│   ├── MiniMap.ts               # 2D Leaflet mini-map
│   ├── TelemetryService.ts      # Fetches drone telemetry
│   ├── WebSocket.ts             # WebSocket communication
│   ├── EventBus.ts              # UI/camera event decoupling
│   ├── SettingsMenu.ts          # Settings UI
│   ├── TelemetryConsole.ts      # Telemetry display
│   ├── ScanDownload.ts          # Scan data handling
│   ├── OrbitCamera.ts           # Camera controls
│   ├── Environment.ts           # Scene setup
│   └── css/                     # Stylesheets
├── android/                     # Capacitor Android build
├── assets/                      # Images, fonts, models
├── public/                      # Static assets
├── playcanvas-frontend/         # (Subproject, mostly node_modules)
├── web-frontend/                # (Subproject, mostly node_modules)
├── index.html                   # Main HTML entry point
├── main.ts                      # Application bootstrap
├── package.json                 # Node.js dependencies
├── capacitor.config.json        # Capacitor configuration
└── config.json                  # App configuration (host, API keys)
```

### Key Components

#### 1. **3D Visualization (PlayCanvas)**
- **Drones.ts**: Handles 3D drone models, positioning, and heading updates
- **OrbitCamera.ts**: Fly/camera controls for 3D scene navigation
- **Environment.ts**: Scene setup and lighting

#### 2. **2D Mini-Map (Leaflet)**
- **MiniMap.ts**: Renders drone positions on a Leaflet map with SVG icons
- Supports expand/collapse modes
- Integrates with 3D view for coordinated visualization

#### 3. **Command System**
- **Commands.ts**: Creates UI for sending commands to drones/peripherals
- **CommandLoader.ts**: Fetches command definitions from backend API (`/commands`)
- **commands.json**: Local JSON with command categories (drone, scanner, pantilt, laser, camera, led, generic)
- Commands have parameters (e.g., `pantilt.rotate` with `pan_angle`, `tilt_angle`)

#### 4. **Telemetry & Communication**
- **TelemetryService.ts**: Periodically fetches active drone data from `/telemetry/active`
- **WebSocket.ts**: Real-time communication for commands and updates
- **TelemetryConsole.ts**: Displays live telemetry data

#### 5. **UI & Interaction**
- **EventBus.ts**: Decouples UI interactions from camera controls (pauses camera when UI is focused)
- **SettingsMenu.ts**: Configuration options
- **ScanDownload.ts**: Handles scan data downloads

#### 6. **Mobile Integration**
- Capacitor for native mobile features (system bars, keyboard, screen orientation)
- Android build configuration in `android/` directory

## How It Works

1. **Initialization**: `main.ts` sets up the PlayCanvas app, initializes modules, and starts telemetry fetching.

2. **Telemetry Loop**: `TelemetryService` fetches drone positions/headings from backend and updates both 3D models and 2D mini-map.

3. **Command Execution**: Users select drones from the taskbar menu, choose commands from categories, input parameters, and send via WebSocket.

4. **Visualization**: Drones appear in 3D space and on the mini-map. Camera controls allow orbiting/flying around the scene.

5. **UI Interaction**: EventBus ensures camera doesn't interfere with UI elements.

## The Ticket: Workflow Composer Implementation

### Task Description
Implement a graphical Workflow Composer for assembling automated processes for the carrier drone and its peripherals (scanner, PanTilt, LED, etc.). The composer uses drag-and-drop to build workflows from building blocks arranged on a "rail" (horizontal sequence).

### Key Requirements
- **Building Blocks**: Rectangular UI elements representing devices, commands, and parameters
- **Drag & Drop**: Place blocks on a rail from left to right
- **Sequence Logic**: Process executes left-to-right along the rail
- **Device Selection**: First block is a device (e.g., scanner, PanTilt)
- **Command Selection**: After device, select command (e.g., rotate, measure)
- **Parameter Input**: If command requires params, input them
- **Editing**: Can reopen blocks to change selections
- **Shift Logic**: Holding a block over an existing one for >1s shifts subsequent blocks right
- **Output**: Generates a JSON file matching the structure of `processes.json`
- **Integration**: JSON is consumed by `system_manager.py` in ScannerDriver for hardware execution

### Referenced External Resources
The following external files were referenced but could not be accessed (404 errors, possibly private repos or outdated links):
- `commands_schema.json`: Extended command schema from HardbyteDroneApi
- `processes.json`: Example process JSON structure from ScannerDriver
- `system_manager.py`: Backend system manager that loads and executes processes

Based on the ticket description, `processes.json` defines how processes are structured, and `system_manager.py` maps these to hardware actions.

### Current Command Structure
From `commands.json`:
- **drone**: arm, disarm, upload_mission, start_mission, etc.
- **scanner**: measure, measure_single
- **pantilt**: rotate (with pan/tilt angles), aim_ball, set_idle, stop
- **laser**: on, off, measure, pulse
- **camera**: take_photo, stream_video
- **led**: on, off, strobe, blink
- **generic**: ping, blink, status, reset

### What Needs to be Done
1. **Design UI Components**: Create draggable building blocks for devices, commands, parameters
2. **Rail System**: Implement horizontal rail for block placement and ordering
3. **Drag & Drop Logic**: Handle dropping blocks, shifting existing ones, validation
4. **Dynamic Forms**: When device is placed, show command selector; when command selected, show parameter inputs
5. **JSON Generation**: Build process JSON matching the required structure (inferred from ticket: similar to commands, but sequenced)
6. **Integration**: Ensure generated JSON can be loaded by system_manager.py
7. **Persistence**: Save/load workflows (possibly to local storage or backend)
8. **Testing**: Validate with backend system_manager

### Context in the Project
- The composer will be a new module, likely added to `src/` (e.g., `WorkflowComposer.ts`)
- Integrate with existing UI (taskbar/sidebar) and EventBus
- Use existing command loading logic from `CommandLoader.ts`
- Output JSON should be compatible with the backend's process execution system

### Next Steps
- Access or obtain the referenced external files (`processes.json`, `system_manager.py`) for exact JSON structure
- Design the UI mockup for the composer
- Implement core drag-drop functionality
- Test JSON output against backend requirements