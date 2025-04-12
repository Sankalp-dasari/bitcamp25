import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for Ground State Energy comparison
const data = [
  { 
    config: 'Config A', 
    existing: -1245, 
    ai: -1412, 
    comparison: 167 // difference (improvement)
  },
  { 
    config: 'Config B', 
    existing: -1098, 
    ai: -1287, 
    comparison: 189
  },
  { 
    config: 'Config C', 
    existing: -967, 
    ai: -1110, 
    comparison: 143
  },
  { 
    config: 'Config D', 
    existing: -1320, 
    ai: -1505, 
    comparison: 185
  },
  { 
    config: 'Config E', 
    existing: -1478, 
    ai: -1656, 
    comparison: 178
  },
];

const GroundStateEnergyChart = () => {
  const [activeView, setActiveView] = useState('comparison'); // 'existing', 'ai', 'comparison'

  // Filter data based on activeView
  const getChartData = () => {
    if (activeView === 'existing') {
      return data.map(item => ({ config: item.config, existing: item.existing }));
    } else if (activeView === 'ai') {
      return data.map(item => ({ config: item.config, ai: item.ai }));
    } else if (activeView === 'comparison') {
      return data.map(item => ({ 
        config: item.config, 
        existing: item.existing,
        ai: item.ai
      }));
    }
    return data;
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
        <LineChart
          data={getChartData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="config" />
          <YAxis label={{ value: 'Energy (kJ/mol)', angle: -90, position: 'insideLeft', dy: 50 }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="existing" 
              name="Existing MOFs" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          )}
          {(activeView === 'ai' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="ai" 
              name="AI-Designed MOFs" 
              stroke="#82ca9d" 
              activeDot={{ r: 8 }} 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroundStateEnergyChart;