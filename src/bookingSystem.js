import axios from 'axios';

// Function to book a room
export const bookRoom = async (roomDetails) => {
    try {
        const response = await axios.post('/api/bookRoom', roomDetails);
        return response.data;
    } catch (error) {
        console.error('Error booking room:', error);
        throw error;
    }
};
