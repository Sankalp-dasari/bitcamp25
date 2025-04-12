import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the Carbon Capture comparison
const data = [
  { name: 'MOF-5', existing: 245, ai: 312 },
  { name: 'HKUST-1', existing: 198, ai: 287 },
  { name: 'ZIF-8', existing: 167, ai: 210 },
  { name: 'UiO-66', existing: 220, ai: 305 },
];

const CarbonCaptureChart = () => {
  const [activeView, setActiveView] = useState('comparison'); // 'existing', 'ai', 'comparison'

  // Filter data based on activeView
  const getChartData = () => {
    if (activeView === 'existing') {
      return data.map(item => ({ name: item.name, existing: item.existing }));
    } else if (activeView === 'ai') {
      return data.map(item => ({ name: item.name, ai: item.ai }));
    }
    return data; // comparison view shows both
  };

  return (
    <div>
      <div className="flex justify-center mb-4 space-x-2 text-sm">
        <button 
          onClick={() => setActiveView('existing')}
          className={`px-2 py-1 rounded ${activeView === 'existing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Existing
        </button>
        <button 
          onClick={() => setActiveView('ai')}
          className={`px-2 py-1 rounded ${activeView === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          AI
        </button>
        <button 
          onClick={() => setActiveView('comparison')}
          className={`px-2 py-1 rounded ${activeView === 'comparison' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Compare
        </button>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={getChartData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'CO₂ mg/g', angle: -90, position: 'insideLeft', dy: 30 }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Bar dataKey="existing" name="Existing MOFs" fill="#8884d8" />
          )}
          {(activeView === 'ai' || activeView === 'comparison') && (
            <Bar dataKey="ai" name="AI-Designed MOFs" fill="#82ca9d" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonCaptureChart;