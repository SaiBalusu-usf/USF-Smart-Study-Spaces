import React, { useState } from 'react';

const BookingComponent = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [duration, setDuration] = useState('1');
    const [spaceType, setSpaceType] = useState('any');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking request:', { date, duration, spaceType });
        // TODO: Connect to booking API
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Book a Study Space</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="input-field"
                    >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Space Type</label>
                    <select
                        value={spaceType}
                        onChange={(e) => setSpaceType(e.target.value)}
                        className="input-field"
                    >
                        <option value="any">Any type</option>
                        <option value="quiet">Quiet space</option>
                        <option value="group">Group study</option>
                        <option value="ada">ADA accessible</option>
                    </select>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                    <i className="fas fa-search mr-2"></i> Find Available Spaces
                </button>
            </form>
            
            <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">My Upcoming Bookings</h3>
                <p className="text-gray-500 text-sm">No upcoming bookings</p>
            </div>
        </div>
    );
};

export default BookingComponent;