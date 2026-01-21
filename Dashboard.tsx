
import React, { useState } from 'react';
import { User, Ride, VehicleType } from '../types';

interface DashboardProps {
  user: User;
  rides: Ride[];
  onAddRide: (ride: Ride) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, rides, onAddRide }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [filterType, setFilterType] = useState<'All' | VehicleType>('All');
  const [newRide, setNewRide] = useState({
    title: '',
    vehicleType: 'Car' as VehicleType,
    origin: '',
    destination: user.college,
    time: '08:00',
    seats: 4,
    price: 50
  });

  const handleCreateRide = (e: React.FormEvent) => {
    e.preventDefault();
    const ride: Ride = {
      id: Math.random().toString(),
      title: newRide.title || `${user.name}'s Ride`,
      driverId: user.id,
      driverName: user.name,
      driverGender: user.gender,
      vehicleType: newRide.vehicleType,
      origin: newRide.origin,
      destination: newRide.destination,
      time: newRide.time,
      availableSeats: newRide.vehicleType === 'Bike' ? 1 : newRide.seats,
      pricePerSeat: newRide.price
    };
    onAddRide(ride);
    setIsAdding(false);
    setNewRide({ ...newRide, title: '', origin: '', vehicleType: 'Car' });
  };

  const displayedRides = rides.filter(r => filterType === 'All' || r.vehicleType === filterType);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Community Rides</h1>
          <p className="text-slate-500">Strictly for {user.gender === 'Female' ? 'Girls' : 'Boys'}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {['All', 'Car', 'Bike'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterType === type ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {type}s
            </button>
          ))}
        </div>

        {user.isDriver && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Post Ride
          </button>
        )}
      </header>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-xl space-y-6">
          <h3 className="text-xl font-bold">Offer a New Trip</h3>
          <form onSubmit={handleCreateRide} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Ride Name</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Give your ride a unique name!"
                value={newRide.title}
                onChange={(e) => setNewRide({...newRide, title: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setNewRide({...newRide, vehicleType: 'Car', seats: 4})}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${newRide.vehicleType === 'Car' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-slate-100 text-slate-500'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  Car
                </button>
                <button
                  type="button"
                  onClick={() => setNewRide({...newRide, vehicleType: 'Bike', seats: 1})}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${newRide.vehicleType === 'Bike' ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold' : 'border-slate-100 text-slate-500'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Bike
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pick-up</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                value={newRide.origin}
                onChange={(e) => setNewRide({...newRide, origin: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Drop-off</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                value={newRide.destination}
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-4 md:col-span-2">
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full p-3 rounded-xl border border-slate-200"
                  onChange={(e) => setNewRide({...newRide, time: e.target.value})}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Seats</label>
                <input 
                  type="number" 
                  min="1" max={newRide.vehicleType === 'Bike' ? 1 : 6}
                  disabled={newRide.vehicleType === 'Bike'}
                  className="w-full p-3 rounded-xl border border-slate-200 disabled:bg-slate-50"
                  value={newRide.seats}
                  onChange={(e) => setNewRide({...newRide, seats: parseInt(e.target.value)})}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">₹ Price</label>
                <input 
                  type="number" 
                  min="0"
                  className="w-full p-3 rounded-xl border border-slate-200"
                  value={newRide.price}
                  onChange={(e) => setNewRide({...newRide, price: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-3 text-slate-500 font-medium hover:text-slate-700"
              >
                Discard
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg"
              >
                Publish Ride
              </button>
            </div>
          </form>
        </div>
      )}

      {displayedRides.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${filterType === 'Bike' ? 'bg-amber-50 text-amber-300' : 'bg-slate-50 text-slate-300'}`}>
            {filterType === 'Bike' ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900">No {filterType.toLowerCase()} rides available</h3>
          <p className="text-slate-500 mt-2">Try switching filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedRides.map(ride => (
            <div key={ride.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative">
              <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${ride.vehicleType === 'Car' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'}`}>
                {ride.vehicleType}
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 pr-16">{ride.title}</h3>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/${ride.driverName}/100`} className="w-10 h-10 rounded-full border-2 border-slate-50 shadow-sm" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">{ride.driverName}</h4>
                    <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Verified Driver
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-slate-900">₹{ride.pricePerSeat}</div>
                </div>
              </div>

              <div className="space-y-4 relative pl-6 border-l-2 border-slate-50 ml-2">
                <div className="relative">
                  <div className="absolute -left-[1.1rem] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Pick-up</div>
                  <div className="text-sm font-semibold text-slate-700">{ride.origin}</div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[1.1rem] top-1 w-2.5 h-2.5 rounded-full bg-slate-900 border-2 border-white"></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Drop-off</div>
                  <div className="text-sm font-semibold text-slate-700">{ride.destination}</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0116 0z" /></svg>
                     {ride.time}
                   </div>
                   <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" /></svg>
                     {ride.availableSeats} {ride.availableSeats === 1 ? 'Seat' : 'Seats'}
                   </div>
                </div>
                <button className={`text-white text-xs font-black py-2.5 px-6 rounded-xl transition-all shadow-lg uppercase tracking-widest ${ride.vehicleType === 'Car' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'}`}>
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
