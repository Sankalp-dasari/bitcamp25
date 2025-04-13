import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Embedded data from the CSV files
const databaseMOFsData = `MOFname,CO2_uptake_P0.15bar_T298K [mmol/g]
str_m1_o10_o18_pcu_sym.166,2.003402
str_m2_o1_o1_pcu_sym.13,3.652736
str_m2_o1_o1_pcu_sym.22,2.885369
str_m2_o1_o1_pcu_sym.28,3.123242
str_m2_o1_o1_pcu_sym.31,2.79595
str_m2_o1_o1_pcu_sym.39,2.981022
str_m2_o1_o1_pcu_sym.43,2.15671
str_m2_o1_o1_pcu_sym.62,2.110925
str_m2_o1_o1_pcu_sym.70,2.927347
str_m2_o1_o1_pcu_sym.81,2.405791`;

const generatedMOFsData = `mof_id,predicted_co2_uptake,performance_score
GEN-MOF-2,1.63054347,99.975
GEN-MOF-3,1.556496263,99
GEN-MOF-6,1.514619231,99
GEN-MOF-1,1.475182652,98.625
GEN-MOF-4,1.483237028,98.05
GEN-MOF-5,1.4502666,97.225
GEN-MOF-7,1.384092331,95.775
GEN-MOF-8,1.378344893,95.775
GEN-MOF-9,1.197660327,88.075
GEN-MOF-10,1.116086483,79.45`;

// Parse CSV data
const parseCSV = (csvString) => {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index]?.trim();
      return obj;
    }, {});
  });
};

// Function to prepare chart data (select top 5 from each dataset)
const prepareChartData = (databaseData, generatedData) => {
  // Sort database MOFs by CO2 uptake (descending)
  const sortedDatabaseData = [...databaseData].sort((a, b) => 
    parseFloat(b['CO2_uptake_P0.15bar_T298K [mmol/g]']) - 
    parseFloat(a['CO2_uptake_P0.15bar_T298K [mmol/g]'])
  );

  // Sort generated MOFs by CO2 uptake (descending)
  const sortedGeneratedData = [...generatedData].sort((a, b) => 
    parseFloat(b.predicted_co2_uptake) - parseFloat(a.predicted_co2_uptake)
  );

  // Take top 5 from each
  const topDatabaseMOFs = sortedDatabaseData.slice(0, 5);
  const topGeneratedMOFs = sortedGeneratedData.slice(0, 5);

  // Create chart data for comparison
  const chartData = [];

  // Add database MOFs
  for (let i = 0; i < topDatabaseMOFs.length; i++) {
    const dbMOF = topDatabaseMOFs[i];
    const genMOF = topGeneratedMOFs[i];
    
    // Calculate improvement
    const existingUptake = parseFloat(dbMOF['CO2_uptake_P0.15bar_T298K [mmol/g]']);
    const aiUptake = parseFloat(genMOF.predicted_co2_uptake);
    const improvementPercent = ((existingUptake - aiUptake) / existingUptake * 100).toFixed(1);
    
    chartData.push({
      index: i + 1,
      name: `MOF ${i + 1}`,
      existingName: dbMOF.MOFname,
      aiName: genMOF.mof_id,
      existing: existingUptake,
      ai: aiUptake,
      improvement: `${Math.abs(improvementPercent)}%`
    });
  }

  return chartData;
};

// Custom colors for the chart
const chartColors = {
  existing: ['#9333EA', '#A855F7'], // Purple gradient
  ai: ['#06B6D4', '#22D3EE'],      // Cyan gradient
  compare: ['#F97316', '#FB923C']  // Orange gradient
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    const item = data.find(item => item.name === label);
    const improvement = item?.improvement;
    
    return (
      <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border border-gray-700 shadow-xl">
        <p className="text-white font-bold mb-2">{label}</p>
        
        {payload.map((entry, index) => {
          const isExisting = entry.dataKey === 'existing';
          return (
            <div key={index} className="flex items-center my-1">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-gray-300">
                <span className="text-gray-400">{entry.name}: </span>
                <span className="font-medium">{entry.value.toFixed(2)} mmol/g</span>
                <span className="text-gray-400 text-xs ml-2">
                  ({isExisting ? item.existingName : item.aiName})
                </span>
              </p>
            </div>
          );
        })}
        
        {payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-emerald-400 font-medium">
              Difference: {improvement}
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
  const [data, setData] = useState([]);
  
  // Parse data and prepare chart data when component mounts
  useEffect(() => {
    // Parse the CSV data
    const databaseData = parseCSV(databaseMOFsData);
    const generatedData = parseCSV(generatedMOFsData);
    
    // Prepare chart data
    const chartData = prepareChartData(databaseData, generatedData);
    setData(chartData);
    
    // Start animation after a short delay
    setTimeout(() => setAnimated(true), 500);
  }, []);
  
  // Filter data based on activeView
  const getChartData = () => {
    if (activeView === 'existing') {
      return data.map(item => ({ name: item.name, existing: item.existing, existingName: item.existingName }));
    } else if (activeView === 'ai') {
      return data.map(item => ({ name: item.name, ai: item.ai, aiName: item.aiName }));
    }
    return data; // comparison view shows both
  };

  // Calculate average improvement percentage
  const getAverageImprovement = () => {
    if (!data.length) return 0;
    
    const total = data.reduce((sum, item) => {
      const value = parseFloat(item.improvement);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    return (total / data.length).toFixed(1);
  };

  // Get min/max improvement values
  const getImprovementRange = () => {
    if (!data.length) return { min: 0, max: 0 };
    
    const values = data.map(item => parseFloat(item.improvement));
    const validValues = values.filter(value => !isNaN(value));
    
    return {
      min: Math.min(...validValues).toFixed(1),
      max: Math.max(...validValues).toFixed(1)
    };
  };

  const playAnimation = () => {
    setAnimated(false);
    setTimeout(() => setAnimated(true), 100);
  };

  const { min, max } = getImprovementRange();

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
          Database MOFs
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('ai')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'ai' 
            ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-lg shadow-cyan-500/50' 
            : 'bg-white/10 text-cyan-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generated MOFs
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
        
        <motion.button
          onClick={playAnimation}
          className="ml-2 px-2 py-2 rounded-lg transition-all bg-white/10 text-blue-300 hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
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
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.7)"
            tick={false}
            label={{
              value: 'MOF Structure',
              position: 'insideBottom',
              dy: 10,
              fill: 'rgba(255,255,255,0.7)'
            }}
            axisLine={{ strokeWidth: 1 }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)" 
            tick={false}
            label={{ 
              value: 'CO₂ Uptake (mmol/g)', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 50,
              fill: 'rgba(255,255,255,0.7)' 
            }}
            domain={[0, 'dataMax']}
            axisLine={{ strokeWidth: 1 }}
          />
          <Tooltip content={<CustomTooltip data={data} />} />
          <Legend 
            verticalAlign="top" 
            height={36} 
            wrapperStyle={{ color: "white" }} 
          />
          
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Bar 
              dataKey="existing" 
              name="Database MOFs" 
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
              name="Generated MOFs" 
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
              The database MOFs show {min}-{max}% difference in CO₂ uptake compared to generated MOFs
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarbonCaptureChart;