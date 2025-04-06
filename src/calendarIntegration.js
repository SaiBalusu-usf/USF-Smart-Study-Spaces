import axios from 'axios';

// Microsoft Graph API configuration
const graphEndpoint = 'https://graph.microsoft.com/v1.0';

// Function to get user's calendar events
export const getCalendarEvents = async (accessToken) => {
    try {
        const response = await axios.get(`${graphEndpoint}/me/events`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.value;
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        throw error;
    }
};
