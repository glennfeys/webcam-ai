/**
 * Sends an image and text prompt to OpenAI's API and retrieves the response.
 *
 * @param {string} imageData - The image data (in base64 image data).
 * @param {string} prompt - The text prompt to accompany the image data.
 * @param {string} openAiEndpoint - The OpenAI API endpoint URL.
 * @param {string} apiKey - The API key for authenticating with the OpenAI API.
 * @param {string} openAiModel - The model identifier to be used for the request (e.g., 'gpt-4-vision-preview').
 * @param {number} maxTokens - The maximum number of tokens to be used in the API response.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the OpenAI API.
 * @throws {Error} Throws an error if required parameters are missing or if there is an issue with the network request.
 */
export async function promptImageWithOpenAI(imageData, prompt, openAiEndpoint, apiKey, openAiModel, maxTokens) {
    if (!openAiEndpoint || !apiKey || !openAiModel)
        throw new Error('OpenAI endpoint or API key is not set.');

    if (!imageData || !prompt)
        throw new Error('Image data or prompt is not set.');

    try {
        const response = await fetch(openAiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: openAiModel,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: prompt
                            },
                            {
                                type: "image_url",
                                image_url: { url: imageData }
                            }
                        ]
                    }
                ],
                max_tokens: maxTokens
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in OpenAI API request:', error);
        throw error; // Rethrow to allow caller to handle the error
    }
}
