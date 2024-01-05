/**
 * Starts the webcam and sets the video stream to the provided video element.
 * Throws an error if the video element is not provided or if the webcam cannot be accessed.
 * @param {HTMLVideoElement} videoElement - The HTML video element to display the webcam stream.
 */
export async function startWebcam(videoElement) {
    if (!videoElement)
        throw new Error('Video element is not set.');

    try {
        // Request access to the webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Set the video source to the webcam stream
        videoElement.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam", err);
        throw err; // Rethrow to allow caller to handle the error
    }
}

/**
 * Captures an image from the video stream and returns it as a data URL.
 * Throws an error if the video or canvas elements are not provided.
 * @param {HTMLVideoElement} videoElement - The video element that displays the webcam stream.
 * @param {HTMLCanvasElement} canvasElement - The canvas element used to capture the image from the video.
 * @returns {string} Data URL of the captured image.
 */
export function captureImage(videoElement, canvasElement) {
    if (!canvasElement || !videoElement)
        throw new Error('Canvas or video element is not set.');

    const context = canvasElement.getContext('2d');
    // Draw the current frame from the video onto the canvas
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
    return canvasElement.toDataURL('image/png');
}