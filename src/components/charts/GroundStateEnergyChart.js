import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for Ground State Energy comparison
const data = [
  { 
    config: 'Config A', 
    existing: -1245, 
    ai: -1412, 
    improvement: 167 // difference (improvement)
  },
  { 
    config: 'Config B', 
    existing: -1098, 
    ai: -1287, 
    improvement: 189
  },
  { 
    config: 'Config C', 
    existing: -967, 
    ai: -1110, 
    improvement: 143
  },
  { 
    config: 'Config D', 
    existing: -1320, 
    ai: -1505, 
    improvement: 185
  },
  { 
    config: 'Config E', 
    existing: -1478, 
    ai: -1656, 
    improvement: 178
  },
];

// Custom colors for the chart
const chartColors = {
  existing: '#EF4444', // Red
  ai: '#10B981',      // Green
  comparison: '#F59E0B'  // Amber
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = data.find(item => item.config === label);
    const improvement = item?.improvement;
    const improvementPercentage = item ? Math.round((improvement / Math.abs(item.existing)) * 100) : 0;
    
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
              <span className="font-medium">{entry.value} kJ/mol</span>
            </p>
          </div>
        ))}
        
        {payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-emerald-400 font-medium">
              Improvement: {improvement} kJ/mol ({improvementPercentage}%)
            </p>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

const GroundStateEnergyChart = () => {
  const [activeView, setActiveView] = useState('comparison'); // 'existing', 'ai', 'comparison'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  
  // Start animation when component mounts
  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);

  // Play animation when button is clicked
  const playAnimation = () => {
    setAnimated(false);
    setIsPlayingAnimation(true);
    setTimeout(() => {
      setAnimated(true);
      setIsPlayingAnimation(false);
    }, 2500); // Animation duration + delay
  };
  
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
      <div className="flex justify-center mb-6 space-x-2 text-sm">
        <motion.button 
          onClick={() => setActiveView('existing')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'existing' 
            ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/50' 
            : 'bg-white/10 text-red-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Existing
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('ai')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'ai' 
            ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/50' 
            : 'bg-white/10 text-green-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('comparison')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'comparison' 
            ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/50' 
            : 'bg-white/10 text-amber-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Compare
        </motion.button>
        
        <motion.button
          onClick={playAnimation}
          disabled={isPlayingAnimation}
          className={`ml-2 px-2 py-2 rounded-lg transition-all bg-white/10 text-blue-300 hover:bg-white/20 ${isPlayingAnimation ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!isPlayingAnimation ? { scale: 1.05 } : {}}
          whileTap={!isPlayingAnimation ? { scale: 0.95 } : {}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </motion.button>
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
          onMouseMove={(data) => {
            if (data && data.activeTooltipIndex !== undefined) {
              setHoveredPoint(data.activeTooltipIndex);
            } else {
              setHoveredPoint(null);
            }
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="existingLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#F87171" stopOpacity={0.8}/>
            </linearGradient>
            <linearGradient id="aiLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#34D399" stopOpacity={0.8}/>
            </linearGradient>
            
            {/* Glow filters */}
            <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="config" 
            stroke="rgba(255,255,255,0.7)"
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            label={{ 
              value: 'Energy (kJ/mol)', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 50,
              fill: 'rgba(255,255,255,0.7)' 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ color: "white" }}
          />
          
          {/* Average improvement line for comparison view */}
          {activeView === 'comparison' && (
            <ReferenceLine 
              y={-1300} 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="3 3" 
              label={{ 
                value: 'Average Energy Level', 
                position: 'insideBottomRight', 
                fill: 'rgba(255,255,255,0.7)',
                fontSize: 12
              }} 
            />
          )}
          
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="existing" 
              name="Existing MOFs" 
              stroke="url(#existingLineGradient)" 
              strokeWidth={3}
              dot={{ 
                stroke: chartColors.existing, 
                strokeWidth: 2, 
                r: 6, 
                fill: '#1F2937',
                filter: hoveredPoint !== null ? "url(#glow-red)" : "none"
              }}
              activeDot={{ 
                r: 8, 
                stroke: 'white', 
                strokeWidth: 2,
                filter: "url(#glow-red)"
              }}
              isAnimationActive={!animated}
              animationDuration={2000}
              animationBegin={0}
            />
          )}
          
          {(activeView === 'ai' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="ai" 
              name="AI-Designed MOFs" 
              stroke="url(#aiLineGradient)" 
              strokeWidth={3}
              dot={{ 
                stroke: chartColors.ai, 
                strokeWidth: 2, 
                r: 6, 
                fill: '#1F2937',
                filter: hoveredPoint !== null ? "url(#glow-green)" : "none"
              }}
              activeDot={{ 
                r: 8, 
                stroke: 'white', 
                strokeWidth: 2,
                filter: "url(#glow-green)"
              }}
              isAnimationActive={!animated}
              animationDuration={2000}
              animationBegin={500}
            />
          )}
        </LineChart>
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
              AI-designed MOFs achieve 12-15% lower ground state energy levels
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroundStateEnergyChart;