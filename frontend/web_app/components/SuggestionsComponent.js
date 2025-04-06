import React from 'react';

const SuggestionsComponent = () => {
    const suggestions = [
        {
            id: 1,
            building: 'Library',
            room: 'Study Room 201',
            reason: 'Matches your usual study time',
            distance: '2 min walk',
            availability: 'Available now'
        },
        {
            id: 2,
            building: 'Student Center',
            room: 'Quiet Zone A',
            reason: 'Near your next class',
            distance: '5 min walk',
            availability: 'Available in 30 mins'
        },
        {
            id: 3,
            building: 'Engineering',
            room: 'Collaboration Space 3',
            reason: 'Preferred by your study group',
            distance: '8 min walk',
            availability: 'Available now'
        }
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Smart Suggestions</h2>
            <p className="text-gray-600 text-sm">
                Based on your schedule and preferences
            </p>
            
            <div className="space-y-3">
                {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="card p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">
                                    {suggestion.building} - {suggestion.room}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {suggestion.reason}
                                </p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {suggestion.availability}
                            </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <i className="fas fa-walking mr-1"></i>
                            {suggestion.distance}
                        </div>
                        <button className="btn-outline w-full mt-3 text-sm">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            
            <button className="btn-primary w-full">
                <i className="fas fa-calendar-alt mr-2"></i> Sync with Calendar
            </button>
        </div>
    );
};

export default SuggestionsComponent;