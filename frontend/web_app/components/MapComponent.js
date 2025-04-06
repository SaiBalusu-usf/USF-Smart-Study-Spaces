import React from 'react';

const MapComponent = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Campus Map</h2>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        <i className="fas fa-layer-group mr-1"></i> Layers
                    </button>
                    <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        <i className="fas fa-search-location mr-1"></i> Search
                    </button>
                </div>
            </div>
            
            <div className="flex-grow bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-map-marked-alt text-5xl text-green-500 mb-2"></i>
                    <p className="text-gray-600">Interactive map coming soon</p>
                    <p className="text-sm text-gray-500 mt-1">Will show real-time study space availability</p>
                </div>
            </div>
            
            <div className="mt-4 flex justify-between">
                <button className="btn-outline">
                    <i className="fas fa-info-circle mr-2"></i> Legend
                </button>
                <button className="btn-primary">
                    <i className="fas fa-location-arrow mr-2"></i> My Location
                </button>
            </div>
        </div>
    );
};

export default MapComponent;