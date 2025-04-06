import axios from 'axios';

// Azure Computer Vision API configuration
const subscriptionKey = 'YOUR_AZURE_SUBSCRIPTION_KEY';
const endpoint = 'YOUR_AZURE_ENDPOINT';

// Function to analyze occupancy using Azure Computer Vision
export const analyzeOccupancy = async (imageUrl) => {
    try {
        const response = await axios.post(`${endpoint}/vision/v3.2/analyze`, {
            url: imageUrl,
            visualFeatures: ['Objects'],
        }, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing occupancy:', error);
        throw error;
    }
};
