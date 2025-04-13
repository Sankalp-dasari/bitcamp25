import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const QuantumEnergyChart = () => {
  const [activeView, setActiveView] = useState('comparison');
  const [data, setData] = useState([]);
  const [animated, setAnimated] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Embedded data from the tuple datasets
  const aiMOFData = `MOF,"(x,y)"
gen-mof-1,"(0, 0.08997118927432514)"
gen-mof-1,"(1, 0.07064828725500749)"
gen-mof-1,"(2, 0.050923979253809984)"
gen-mof-1,"(3, 0.030918987828095884)"
gen-mof-1,"(4, 0.010760738517836046)"
gen-mof-1,"(5, -0.009419906619012232)"
gen-mof-1,"(6, -0.029492086086046004)"
gen-mof-1,"(7, -0.04932835515068484)"
gen-mof-1,"(8, -0.06880789299886735)"
gen-mof-1,"(9, -0.08781933359100147)"`;

  const existingMOFData = `MOF,"(x,y)"
str_m1_o10_o18_pcu_sym.166,"(0, 0.20024977528374482)"
str_m1_o10_o18_pcu_sym.166,"(1, 0.18576815821199033)"
str_m1_o10_o18_pcu_sym.166,"(2, 0.17033308063615993)"
str_m1_o10_o18_pcu_sym.166,"(3, 0.15396177273554432)"
str_m1_o10_o18_pcu_sym.166,"(4, 0.1366882408872071)"
str_m1_o10_o18_pcu_sym.166,"(5, 0.11856455730593637)"
str_m1_o10_o18_pcu_sym.166,"(6, 0.09966157314612806)"
str_m1_o10_o18_pcu_sym.166,"(7, 0.08006891249647075)"
str_m1_o10_o18_pcu_sym.166,"(8, 0.05989413708474098)"
str_m1_o10_o18_pcu_sym.166,"(9, 0.039261022151065034)"`;

  // Parse CSV data
  const parseCSVData = (csvString) => {
    // Split the CSV string into lines
    const lines = csvString.trim().split('\n');
    
    // Skip the header row (first line)
    const dataLines = lines.slice(1);
    
    // Parse each line
    return dataLines.map((line) => {
      // Extract MOF name and coordinates
      const match = line.match(/(.*?),"\((.*?), (.*?)\)"/);
      
      if (match && match.length === 4) {
        const mofName = match[1].trim();
        const iteration = parseInt(match[2]);
        const energy = parseFloat(match[3]);
        
        return {
          mofName,
          iteration,
          energy
        };
      }
      return null;
    }).filter(item => item !== null);
  };

  // Prepare chart data
  const prepareChartData = (aiData, existingData) => {
    const chartData = [];
    
    // Use only the first 10 points
    const limit = 10;
    
    for (let i = 0; i < limit; i++) {
      if (i < aiData.length && i < existingData.length) {
        const improvementValue = existingData[i].energy - aiData[i].energy;
        
        chartData.push({
          config: `Iteration ${i}`,
          existing: existingData[i].energy,
          ai: aiData[i].energy,
          improvement: improvementValue
        });
      }
    }
    
    return chartData;
  };
  
  // Load and process data when component mounts
  useEffect(() => {
    // Parse the embedded datasets
    const aiData = parseCSVData(aiMOFData);
    const existingData = parseCSVData(existingMOFData);
    
    // Prepare data for the chart
    const chartData = prepareChartData(aiData, existingData);
    setData(chartData);
    
    // Start animation with a short delay
    setTimeout(() => setAnimated(true), 500);
  }, []);
  
  // Custom colors for the chart
  const chartColors = {
    existing: '#EF4444', // Red
    ai: '#10B981',      // Green
    comparison: '#F59E0B'  // Amber
  };

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
      return data;
    }
    return data;
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
                <span className="font-medium">{entry.value.toFixed(4)}</span>
              </p>
            </div>
          ))}
          
          {payload.length > 1 && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-emerald-400 font-medium">
                Improvement: {improvement.toFixed(4)} ({improvementPercentage}%)
              </p>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  // Calculate average improvement percentage
  const getAverageImprovement = () => {
    if (!data.length) return 0;
    
    const avgImprovement = data.reduce((total, item) => {
      return total + (item.improvement / Math.abs(item.existing)) * 100;
    }, 0) / data.length;
    
    return avgImprovement.toFixed(1);
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
          Existing MOFs
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('ai')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'ai' 
            ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/50' 
            : 'bg-white/10 text-green-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI MOFs
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
              value: 'Energy Value', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 50,
              fill: 'rgba(255,255,255,0.7)' 
            }}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ color: "white" }}
          />
          
          {/* Reference line for zero energy level */}
          {activeView === 'comparison' && (
            <ReferenceLine 
              y={0} 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="3 3" 
              label={{ 
                value: 'Zero Energy Level', 
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
              AI-designed MOFs achieve {getAverageImprovement()}% lower energy levels after multiple iterations
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantumEnergyChart;