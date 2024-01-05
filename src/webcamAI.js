import { startWebcam, captureImage } from './webcam.js';
import { promptImageWithOpenAI } from './openai.js';

// Default values
const OPEN_AI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4-vision-preview';
const MAX_TOKENS = 1000;

/**
 * WebcamAI integrates webcam functionality with OpenAI's vision API for image prompting.
 * It allows capturing images from a webcam and using them in openAI prompts.
 */
class WebcamAI {
    /**
     * Constructs a WebcamAI instance with configurable options.
     * @param {Object} options - Configuration options for the instance.
     * @param {string|null} options.apiKey - The API key for OpenAI.
     * @param {string} options.openAiEndpoint - The endpoint for OpenAI API.
     * @param {HTMLVideoElement} options.videoElement - The video element for the webcam.
     * @param {HTMLCanvasElement} options.canvasElement - The canvas element for capturing images.
     * @param {boolean} options.startWebcam - Flag to auto-start the webcam.
     * @param {string} options.model - The model identifier for OpenAI.
     * @param {number} options.maxTokens - The maximum tokens for OpenAI prompt.
     */
    constructor(options = {}) {
        this.apiKey = options.apiKey || null;
        this.openAiEndpoint = options.openAiEndpoint || OPEN_AI_ENDPOINT;
        this.videoElement = options.videoElement || document.querySelector('video');
        this.canvasElement = options.canvasElement || document.querySelector('canvas');
        this.startWebcam = 'startWebcam' in options ? options.startWebcam : true;
        this.model = options.model || MODEL;
        this.maxTokens = options.maxTokens || MAX_TOKENS;

        if (this.startWebcam)
            this.initWebcam();
    }

    /**
     * Initializes the webcam by accessing the video element.
     * Throws an error if the video element is not accessible.
     */
    async initWebcam() {
        if (!this.videoElement)
            console.error('Video element is not set.');

        try {
            await startWebcam(this.videoElement);
            console.log('Webcam started successfully.');
        } catch (error) {
            console.error('Error starting webcam:', error);
            throw error;
        }
    }

    // Set the API key for OpenAI
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Captures an image from the webcam and prompts OpenAI for analysis.
     * Throws an error if the video or canvas elements or the API key are not set.
     * @param {string} prompt - The prompt to send to OpenAI.
     * @returns {Promise<Object>} - The response from OpenAI.
     */
    async promptWebcam(prompt) {
        if (!this.videoElement || !this.canvasElement)
            throw new Error('Video or canvas element is not set.');

        if (!this.apiKey)
            throw new Error('API key is not set.');

        try {
            const image = captureImage(this.videoElement, this.canvasElement);
            return await promptImageWithOpenAI(image, prompt, this.openAiEndpoint, this.apiKey, this.model, this.maxTokens);
        } catch (error) {
            console.error('Error in capture or analysis:', error);
            throw error;
        }
    }
}

export default WebcamAI;
