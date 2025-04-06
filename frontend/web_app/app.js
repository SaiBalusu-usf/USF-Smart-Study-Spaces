// USF SmartStudy Spaces - Web Application
// Main application logic and initialization

// Import React and components
import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './components/MapComponent';
import BookingComponent from './components/BookingComponent';
import SuggestionsComponent from './components/SuggestionsComponent';

// Global configuration
const config = {
    apiBaseUrl: 'http://localhost:7071/api',
    mapOptions: {
        center: [28.0587, -82.4139], // USF Tampa coordinates
        zoom: 16,
        style: 'road' // Azure Maps style
    }
};

// Initialize React Components
function initMap() {
    ReactDOM.render(
        <MapComponent />,
        document.getElementById('map-container')
    );
}

function initBookingComponent() {
    ReactDOM.render(
        <BookingComponent />,
        document.getElementById('booking-component')
    );
}

function initSuggestionsComponent() {
    const suggestionsPanel = document.createElement('div');
    suggestionsPanel.id = 'suggestions-component';
    document.querySelector('.lg\\:col-span-2').appendChild(suggestionsPanel);
    
    ReactDOM.render(
        <SuggestionsComponent />,
        suggestionsPanel
    );
}

// Data Loading
async function loadInitialData() {
    console.log('Loading initial data...');
    try {
        const [occupancyRes, buildingsRes] = await Promise.all([
            fetch(`${config.apiBaseUrl}/occupancy`),
            fetch(`${config.apiBaseUrl}/buildings`)
        ]);
        
        const occupancyData = await occupancyRes.json();
        const buildingsData = await buildingsRes.json();
        
        console.log('Initial data loaded:', {
            occupancy: occupancyData,
            buildings: buildingsData
        });
    } catch (error) {
        console.error('Error loading initial data:', error);
        showToast('Failed to load initial data', 'error');
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    // TODO: Implement toast notifications
    console.log(`Toast [${type}]: ${message}`);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SmartStudy Spaces web app...');
    
    // Initialize components
    initMap();
    initBookingComponent();
    initSuggestionsComponent();
    loadInitialData();
    
    // Add service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});