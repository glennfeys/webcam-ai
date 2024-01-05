# WebcamAI with OpenAI Integration

WebcamAI is a JavaScript package designed to integrate webcam functionalities with OpenAI's API, allowing users to capture images from a webcam and use them for AI-based analysis and processing. It includes utilities for starting the webcam, capturing images, and sending these images along with text prompts to OpenAI's API.

### Features

- Initialize and start a webcam stream in a web application.
- Capture images from the webcam.
- Send images and text prompts to OpenAI's viosion API for analysis.
- Flexible configuration options.

### Installation

1. Clone the Repository
    Start by cloning the WebcamAI repository from GitHub. Open your terminal and run the following command:

    ```
    git clone https://github.com/glennfeys/webcam-ai.git
    ```

2. This will create a local copy of the repository on your machine.

    Navigate to the Repository Folder
    Change your current directory to the newly cloned repository:

    ```
    cd webcam-ai
    ```

3. Run example locally
    To serve the example files locally, install http-server, a simple, zero-configuration command-line HTTP server. It can be installed globally so you can use it for any project:

    ```
    npm install -g http-server
    ```

4. Start the Server
    ```
    http-server
    ```

    This will start a local web server. By default, http-server listens on port 8080.

5. Access the Example in Your Browser
    Open your web browser and go to http://localhost:8080/examples/example.html to view and interact with the example.

### Usage

WebcamAI handles webcam operations and integrates with OpenAI's vision API.

```js
//TODO change path to package path
import WebcamAI from "path-to-package";

const videoElement = document.querySelector('video');
const canvasElement = document.createElement('canvas');

const webcamAI = new WebcamAI({
    apiKey: 'your-openai-api-key',
    videoElement: videoElement
    canvasElement: canvasElement
    // ... other configuration options
});

// To start the webcam and capture an image
webcamAI.promptWebcam("Describe what you see!")
```

### Configuration Options

Explain the different configuration options available for WebcamAI.

- `apiKey` (string): The API key for OpenAI.
- `videoElement` (HTMLElement): The video element for the webcam.
- `canvasElement` (HTMLElement): The canvas element for capturing images.
- `startWebcam` (boolean): Flag to auto-start the webcam.
- `openAiEndpoint` (string): The OpenAI API endpoint URL.
- `model` (string): The model identifier for OpenAI.
- `maxTokens` (number): The maximum number of tokens for the OpenAI prompt.

### API Reference

Detailed API documentation for WebcamAI and openai.js functions.
WebcamAI

    constructor(options): Initializes a new instance of WebcamAI with the given options.
    promptWebcam(prompt): Captures an image from the webcam and prompts OpenAI for analysis.
    setApiKey(apiKey): Set the API key for OpenAI.

### License

MIT
