import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CarbonCaptureChart from '../components/charts/CarbonCaptureChart';
import GroundStateEnergyChart from '../components/charts/GroundStateEnergyChart';
import { teamMembers, implementationSteps, mofStructureComponents } from '../data/mofsData';

// Particle background component
const ParticleBackground = () => {
  return (
    <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white opacity-30"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
          }}
        />
      ))}
    </div>
  );
};

// Animated section title component
const SectionTitle = ({ children, color = "text-white" }) => (
  <motion.h2 
    className={`text-4xl md:text-5xl font-bold mb-10 text-center ${color}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <span className="relative inline-block">
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </span>
  </motion.h2>
);

// TeamMemberCard component for Home.js with local image support
const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorPalettes = [
    "from-pink-500 to-purple-600",
    "from-blue-500 to-teal-400",
    "from-amber-500 to-red-500",
    "from-green-500 to-emerald-400"
  ];
  
  // Default emojis as fallback
  const fallbackEmojis = ["👩‍🔬", "👨‍💻", "🧪", "👩‍💼"];
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`bg-gradient-to-br ${colorPalettes[index % colorPalettes.length]} p-1 rounded-xl shadow-lg`}>
        <div className="bg-gray-900 p-6 rounded-lg h-full flex flex-col items-center">
          <motion.div 
            className="w-32 h-32 mb-6 relative rounded-full overflow-hidden"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colorPalettes[index % colorPalettes.length]} rounded-full opacity-80`}></div>
            
            {member.imageUrl ? (
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gray-800"
                onError={(e) => {
                  // If image fails to load, show the emoji fallback
                  e.target.style.display = 'none';
                  const parent = e.target.parentNode;
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center';
                  const emojiSpan = document.createElement('span');
                  emojiSpan.className = 'text-4xl';
                  emojiSpan.textContent = fallbackEmojis[index % fallbackEmojis.length];
                  fallbackDiv.appendChild(emojiSpan);
                  parent.appendChild(fallbackDiv);
                }}
              />
            ) : (
              <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-4xl">{fallbackEmojis[index % fallbackEmojis.length]}</span>
              </div>
            )}
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
          <p className={`text-${index === 0 ? 'pink' : index === 1 ? 'blue' : index === 2 ? 'amber' : 'green'}-300 font-medium`}>{member.role}</p>
          
          <motion.div 
            className={`w-16 h-0.5 my-4 bg-gradient-to-r ${colorPalettes[index % colorPalettes.length]}`}
            animate={isHovered ? { width: "80%" } : { width: "4rem" }}
          />
          
          <AnimatePresence>
            {isHovered && (
              <motion.p 
                className="text-gray-300 text-sm text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {member.bio}
              </motion.p>
            )}
          </AnimatePresence>
          
          {!isHovered && (
            <motion.p className="text-sm text-gray-400 mt-2 italic">Hover for details</motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// MOF structure interactive card component
const MOFStructureCard = ({ component, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="border border-purple-500/30 rounded-lg overflow-hidden bg-purple-900/20 hover:bg-purple-900/40 transition-colors cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onClick={() => setIsExpanded(!isExpanded)}
      layout
    >
      <div className="p-4 flex items-center justify-between">
        <span className="font-medium text-white">{component.name}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 text-sm text-gray-300"
          >
            {component.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Interactive implementation diagram
const ImplementationFlow = () => {
  const [activeStep, setActiveStep] = useState(null);
  
  return (
    <div className="relative py-10">
      {/* Connecting line */}
      <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transform -translate-y-1/2 rounded-full"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center relative">
        {implementationSteps.map((step, index) => (
          <div key={step.id} className="my-8 md:my-0 relative z-10 w-full md:w-auto">
            <motion.div 
              className={`w-36 h-36 rounded-full mx-auto cursor-pointer relative
                          ${activeStep === index ? 'ring-4 ring-offset-4 ring-offset-gray-900 ring-yellow-400' : ''}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-80"></div>
              <div className="absolute inset-2 bg-gray-900 rounded-full flex flex-col items-center justify-center p-2 text-center">
                <h3 className="font-bold text-lg text-white">{step.title}</h3>
                <span className="text-xs text-yellow-300 mt-1">Step {step.id}</span>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {activeStep === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20 left-1/2 transform -translate-x-1/2 w-64"
                >
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-transparent border-b-gray-800/90"></div>
                    <p className="text-sm text-white">{step.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Home component
const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 300;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <ParticleBackground />
      
      {/* Quick Navigation */}
      <nav className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {['hero', 'about', 'objective', 'implementation', 'results', 'vision'].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              className="group flex items-center"
            >
              <span 
                className={`w-3 h-3 rounded-full transition-all duration-300 mr-2
                           ${activeSection === section 
                             ? 'bg-white scale-125' 
                             : 'bg-white/30 group-hover:bg-white/70'}`}
              />
              <span 
                className={`text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1
                           ${activeSection === section ? 'text-white' : 'text-white/50'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </a>
          ))}
        </div>
      </nav>

{/* Hero Section with Logo and Title */}
<section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/70 to-pink-900/70 z-0" />
  
  <div className="max-w-4xl mx-auto px-4 z-10 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo added here */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src="/images/logo.png" 
          alt="CarbonQapture Logo" 
          className="h-40 md:h-48 mx-auto"
          onError={(e) => {
            console.error("Logo failed to load");
            e.target.alt = "CarbonQapture";
            // Hide the image if it fails to load
            e.target.style.display = 'none';
          }}
        />
      </motion.div>
      
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              animate={{ 
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 5px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              CarbonQapture
            </motion.h1>
            
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mb-8"
              animate={{ width: ["8rem", "16rem", "8rem"] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Simulating metal organic frameworks to capture carbon dioxide using a variational quantum eigensolver
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <a 
                href="#about" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-lg font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:-translate-y-1"
              >
                Discover Our Work
              </a>
            </motion.div>
          </motion.div>
          
          {/* Removed the downward arrow that was here */}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-purple-900/70 to-blue-900/70 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle>About Us</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Objective Section */}
      <section id="objective" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-indigo-900/70 to-violet-900/70 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle>Our Objective</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-indigo-500/20 h-full">
                <p className="text-white/90 mb-6 text-lg">
                Our primary objective is to harness the power of quantum computing by employing the Variational Quantum Eigensolver (VQE) to explore and simulate the behavior of various metal-organic frameworks (MOFs) in the context of CO₂ capture.
                </p>
                <p className="text-white/90 mb-6 text-lg">
                By utilizing a curated database of existing MOF structures, our approach involves running high-fidelity quantum simulations to understand and quantify each material’s capacity for CO₂ sequestration. The simulation data will not only provide key insights into the mechanisms of gas adsorption at the molecular level, but will also serve as a robust foundation for training a dedicated artificial intelligence model.
                </p>
                <p className="text-white/90 text-lg">
                This AI model is designed to analyze simulation outcomes, learn complex patterns in material properties, and ultimately, propose new and innovative MOF structures optimized for enhanced CO₂ capture. This integrated workflow stands at the intersection of quantum chemistry, advanced computation, and machine learning, aiming to accelerate the discovery of next-generation materials with environmental significance.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-indigo-500/20 h-full">
                <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">MOF Structure</h3>
                <div className="flex flex-col space-y-3">
                  {mofStructureComponents.map((component, index) => (
                    <MOFStructureCard key={index} component={component} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/70 via-fuchsia-900/70 to-rose-900/70 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle>Implementation</SectionTitle>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Click on each step to learn more about our implementation process
          </p>
          
          <ImplementationFlow />
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/70 via-amber-900/70 to-emerald-900/70 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle>Results</SectionTitle>
          <motion.h3 
            className="text-2xl font-medium mb-12 text-center text-amber-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            New MOFs Created
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-amber-500/20">
                <div className="px-6 py-4 bg-gradient-to-r from-amber-900/50 to-orange-900/50">
                  <h4 className="text-xl font-bold text-center text-amber-300">Carbon Capture</h4>
                </div>
                <div className="p-6">
                  <CarbonCaptureChart />
                  <div className="mt-4 text-sm text-center text-gray-300">
                    Interactive comparison of carbon capture efficiency
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-emerald-500/20">
                <div className="px-6 py-4 bg-gradient-to-r from-emerald-900/50 to-green-900/50">
                  <h4 className="text-xl font-bold text-center text-emerald-300">Ground State Energy</h4>
                </div>
                <div className="p-6">
                  <GroundStateEnergyChart />
                  <div className="mt-4 text-sm text-center text-gray-300">
                    Interactive comparison of ground state energy properties
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-blue-900/70 to-indigo-900/70 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle>Our Vision</SectionTitle>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <div className="relative w-full aspect-square">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-sm transform rotate-3"></div>
  <div className="absolute inset-2 bg-gray-900 rounded-sm flex items-center justify-center p-4">
    <div className="text-center">
      <img 
        src="https://marketplace.canva.com/EAGgk9aelTw/1/0/1280w/canva-green-blue-organic-illustrative-sustainability-climate-change-animated-instagram-post-_PJijoqP0Uk.jpg" 
        alt="Sustainable Future" 
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <span className="text-xl font-medium text-cyan-300">Sustainable Future</span>
    </div>
  </div>
</div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-2/3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-500/20">
                <p className="text-white/90 mb-6 text-lg">
                Our long-term vision is to revolutionize the way innovative materials are discovered and optimized to meet critical environmental challenges. By integrating cutting-edge quantum algorithms with artificial intelligence, we aspire to create a dynamic research platform that continuously evolves and adapts, fostering unprecedented breakthroughs in the field of carbon capture.
                </p>
                <p className="text-white/90 mb-6 text-lg">
                We envision a future where our approach not only contributes to a deeper understanding of MOF chemistry and CO₂ sequestration but also spearheads the development of sustainable, high-performance materials.
                </p>
                <p className="text-white/90 text-lg">
                This initiative aspires to bridge the gap between theoretical simulation and practical application, ultimately contributing to global efforts against climate change. In this vision, the synergy between quantum computing and AI will pave the way for scalable, efficient material design strategies that empower industries and governments worldwide to achieve cleaner, greener technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 to-black z-0" />
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Learn More About Our Project</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/research" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                Research Papers
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="inline-block px-8 py-4 bg-transparent border-2 border-white rounded-xl text-xl font-bold shadow-lg hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;