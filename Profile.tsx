
import React, { useState } from 'react';
import { User, VehicleType } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleSave = () => {
    onUpdate({ ...user, name: newName });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center space-y-6">
        <div className="relative inline-block">
          <img 
            src={user.avatar} 
            className="w-32 h-32 rounded-full border-4 border-indigo-50 shadow-inner" 
            alt="Avatar" 
          />
          <div className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full border-4 border-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          {isEditing ? (
            <div className="flex flex-col items-center gap-2">
              <input 
                type="text" 
                className="text-center text-2xl font-bold border-b-2 border-indigo-500 outline-none p-1"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase"
                >
                  Save
                </button>
                <button 
                  onClick={() => { setIsEditing(false); setNewName(user.name); }}
                  className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full uppercase"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 group">
              <h2 className="text-3xl font-bold text-slate-900">{user.name}</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Change Name
              </button>
            </div>
          )}
          <p className="text-indigo-600 font-semibold">{user.college}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-50">
          <div className="text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
            <div className="text-xs font-bold text-slate-800">Verified</div>
          </div>
          <div className="text-center border-x border-slate-50">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</div>
            <div className="text-xs font-bold text-slate-800">{user.gender}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mode</div>
            <div className="text-xs font-bold text-slate-800">{user.isDriver ? 'Driver' : 'Passenger'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Safety Tier 1</div>
                <div className="text-xs text-slate-500">Gender-Matched Active</div>
              </div>
            </div>
            <span className="text-xs font-bold text-green-600 uppercase">Active</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Vehicle Class</div>
                <div className="text-xs text-slate-500">Flexible Car/Bike Posting</div>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 uppercase">Enabled</span>
          </div>
        </div>

        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-lg transition-all uppercase tracking-widest text-sm">
          Sign Out
        </button>
      </div>
      
      <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl shadow-slate-100 flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="space-y-1 relative z-10">
          <h3 className="text-xl font-bold">Carbon Neutral</h3>
          <p className="text-slate-400 text-sm">Every shared ride reduces campus traffic.</p>
        </div>
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10 border border-white/10">
           <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export default Profile;
