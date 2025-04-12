import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for the Carbon Capture comparison
const data = [
  { name: 'MOF-5', existing: 245, ai: 312, improvement: '27%' },
  { name: 'HKUST-1', existing: 198, ai: 287, improvement: '45%' },
  { name: 'ZIF-8', existing: 167, ai: 210, improvement: '26%' },
  { name: 'UiO-66', existing: 220, ai: 305, improvement: '39%' },
];

// Custom colors for the chart
const chartColors = {
  existing: ['#9333EA', '#A855F7'], // Purple gradient
  ai: ['#06B6D4', '#22D3EE'],      // Cyan gradient
  compare: ['#F97316', '#FB923C']  // Orange gradient
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const improvement = data.find(item => item.name === label)?.improvement;
    
    return (
      <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border border-gray-700 shadow-xl">
        <p className="text-white font-bold mb-2">{label}</p>
        
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center my-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-gray-300">
              <span className="text-gray-400">{entry.name}: </span>
              <span className="font-medium">{entry.value} CO₂ mg/g</span>
            </p>
          </div>
        ))}
        
        {payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-emerald-400 font-medium">
              Improvement: {improvement}
            </p>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

const CarbonCaptureChart = () => {
  const [activeView, setActiveView] = useState('comparison'); // 'existing', 'ai', 'comparison'
  const [hoveredBar, setHoveredBar] = useState(null);
  const [animated, setAnimated] = useState(false);
  
  // Start animation when component mounts
  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);
  
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
      <div className="flex justify-center mb-6 space-x-2 text-sm">
        <motion.button 
          onClick={() => setActiveView('existing')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'existing' 
            ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/50' 
            : 'bg-white/10 text-purple-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Existing
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('ai')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'ai' 
            ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-lg shadow-cyan-500/50' 
            : 'bg-white/10 text-cyan-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('comparison')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'comparison' 
            ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/50' 
            : 'bg-white/10 text-orange-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Compare
        </motion.button>
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
          onMouseMove={(data) => {
            if (data && data.activeTooltipIndex !== undefined) {
              setHoveredBar(data.activeTooltipIndex);
            } else {
              setHoveredBar(null);
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <defs>
            <linearGradient id="existingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.existing[0]} stopOpacity={0.9}/>
              <stop offset="100%" stopColor={chartColors.existing[1]} stopOpacity={0.9}/>
            </linearGradient>
            <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.ai[0]} stopOpacity={0.9}/>
              <stop offset="100%" stopColor={chartColors.ai[1]} stopOpacity={0.9}/>
            </linearGradient>
            
            {/* Add glow effect filters */}
            <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.7)"
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            label={{ 
              value: 'CO₂ mg/g', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 30,
              fill: 'rgba(255,255,255,0.7)' 
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36} 
            wrapperStyle={{ color: "white" }} 
          />
          
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Bar 
              dataKey="existing" 
              name="Existing MOFs" 
              fill="url(#existingGradient)" 
              filter={hoveredBar !== null ? "url(#glow-purple)" : "none"}
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
              animationBegin={0}
              isAnimationActive={!animated}
            >
              {getChartData().map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  filter={hoveredBar === index ? "url(#glow-purple)" : "none"}
                  style={{
                    transition: 'filter 0.3s ease',
                    opacity: hoveredBar === null || hoveredBar === index ? 1 : 0.7,
                  }}
                />
              ))}
            </Bar>
          )}
          
          {(activeView === 'ai' || activeView === 'comparison') && (
            <Bar 
              dataKey="ai" 
              name="AI-Designed MOFs" 
              fill="url(#aiGradient)" 
              filter={hoveredBar !== null ? "url(#glow-cyan)" : "none"}
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
              animationBegin={500}
              isAnimationActive={!animated}
            >
              {getChartData().map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  filter={hoveredBar === index ? "url(#glow-cyan)" : "none"}
                  style={{
                    transition: 'filter 0.3s ease',
                    opacity: hoveredBar === null || hoveredBar === index ? 1 : 0.7,
                  }}
                />
              ))}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>

      <AnimatePresence>
        {activeView === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-emerald-300 text-sm font-medium">
              AI-designed MOFs show a 26-45% improvement in carbon capture capacity
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarbonCaptureChart;