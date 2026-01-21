
import React, { useState } from 'react';
import { Gender } from '../types';

interface LandingProps {
  onStart: (data: any) => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    gender: 'Female' as Gender
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.college) {
      onStart(formData);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-4 max-w-2xl">
        <div className="inline-block p-3 bg-indigo-100 rounded-2xl mb-4">
          <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
          Safe Rides for <span className="text-indigo-600 underline decoration-indigo-200">Everyone</span>
        </h1>
        <p className="text-xl text-slate-600">
          A secure, verified community for college students. 
          <span className="block font-semibold mt-2 text-indigo-700">Safety Rule: Girls only pick up girls. Boys only pick up boys.</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">College / University</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Stanford University"
              value={formData.college}
              onChange={(e) => setFormData({...formData, college: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, gender: 'Female'})}
                className={`py-3 rounded-xl border transition-all ${formData.gender === 'Female' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, gender: 'Male'})}
                className={`py-3 rounded-xl border transition-all ${formData.gender === 'Male' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                Male
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center italic">
              * Verification will enforce gender-matched pooling for your safety.
            </p>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            Start Joining
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
