
import React, { useState, useEffect, useMemo } from 'react';
import { User, Ride, Gender } from './types';
import Landing from './components/Landing';
import Verification from './components/Verification';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

const MOCK_RIDES: Ride[] = [
  { id: '1', title: 'Early Morning Sprint', vehicleType: 'Car', driverId: 'd1', driverName: 'Emma Watson', driverGender: 'Female', origin: 'Downtown', destination: 'City College', time: '08:30 AM', availableSeats: 3, pricePerSeat: 50 },
  { id: '2', title: 'City Commuter Bike', vehicleType: 'Bike', driverId: 'd2', driverName: 'James Miller', driverGender: 'Male', origin: 'East Side', destination: 'City College', time: '09:00 AM', availableSeats: 1, pricePerSeat: 30 },
  { id: '3', title: 'West Park Shuttle', vehicleType: 'Car', driverId: 'd3', driverName: 'Sarah Jenkins', driverGender: 'Female', origin: 'West Park', destination: 'City College', time: '08:45 AM', availableSeats: 1, pricePerSeat: 60 },
  { id: '4', title: 'Campus Express', vehicleType: 'Bike', driverId: 'd4', driverName: 'Michael Chen', driverGender: 'Male', origin: 'South Station', destination: 'City College', time: '09:15 AM', availableSeats: 1, pricePerSeat: 25 },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'verify' | 'dashboard' | 'profile'>('landing');
  const [allRides, setAllRides] = useState<Ride[]>(MOCK_RIDES);

  const handleLogin = (userData: Partial<User>) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      college: userData.college || '',
      gender: userData.gender || 'Other',
      isVerified: false,
      isDriver: false,
      avatar: `https://picsum.photos/seed/${userData.name}/200`,
      ...userData
    } as User);
    setView('verify');
  };

  const handleVerificationComplete = (updatedUser: User) => {
    setUser(updatedUser);
    setView('dashboard');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const filteredRides = useMemo(() => {
    if (!user) return [];
    // Strict safety rule: Boys pick up boys, girls pick up girls
    return allRides.filter(ride => ride.driverGender === user.gender);
  }, [user, allRides]);

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <Landing onStart={handleLogin} />;
      case 'verify':
        return user ? (
          <Verification 
            user={user} 
            onComplete={handleVerificationComplete} 
          />
        ) : null;
      case 'dashboard':
        return user ? (
          <Dashboard 
            user={user} 
            rides={filteredRides} 
            onAddRide={(r) => setAllRides([...allRides, r])}
          />
        ) : null;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleUpdateUser} /> : null;
      default:
        return <Landing onStart={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {user && view !== 'landing' && view !== 'verify' && (
        <Navbar user={user} setView={setView} currentView={view} />
      )}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        {renderView()}
      </main>
      
      {view !== 'landing' && (
        <footer className="py-6 text-center text-xs text-slate-400 border-t mt-12 bg-white">
          <p>© 2024 UniRide • Verified Community • Strict Safety Protocols</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div> System Active
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> AI-Verified
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
