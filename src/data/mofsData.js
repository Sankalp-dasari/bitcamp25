// Team Members Data
export const teamMembers = [
    {
      id: 1,
      name: 'Aditya Sunke',
      role: 'CS major',
      bio: 'Specializes in computational chemistry and MOF design with over 10 years of experience in materials science and catalysis.'
    },
    {
      id: 2,
      name: 'Aarya Anup',
      role: 'CS major',
      bio: 'Expert in machine learning applications for materials science and molecular modeling with publications in Nature and Science.'
    },
    {
      id: 3,
      name: 'Sophia Chukka',
      role: 'CMDA major',
      bio: 'Focuses on experimental validation and synthesis of novel MOF structures with particular expertise in high-throughput screening methods.'
    },
    {
      id: 4,
      name: 'Sankalp Dasari',
      role: 'CS major',
      bio: 'Manages project workflow and coordinates between computational and experimental teams with background in both chemistry and environmental science.'
    }
  ];
  
  // Carbon Capture Data
  export const carbonCaptureData = [
    { id: 1, name: 'MOF-5', existing: 245, ai: 312, improvement: '27%' },
    { id: 2, name: 'HKUST-1', existing: 198, ai: 287, improvement: '45%' },
    { id: 3, name: 'ZIF-8', existing: 167, ai: 210, improvement: '26%' },
    { id: 4, name: 'UiO-66', existing: 220, ai: 305, improvement: '39%' },
    { id: 5, name: 'MIL-101', existing: 278, ai: 356, improvement: '28%' },
  ];
  
  // Ground State Energy Data
  export const groundStateEnergyData = [
    { id: 1, name: 'MOF-5', existingEnergy: -1245, aiEnergy: -1412, improvement: '13%' },
    { id: 2, name: 'HKUST-1', existingEnergy: -1098, aiEnergy: -1287, improvement: '17%' },
    { id: 3, name: 'ZIF-8', existingEnergy: -967, aiEnergy: -1110, improvement: '15%' },
    { id: 4, name: 'UiO-66', existingEnergy: -1320, aiEnergy: -1505, improvement: '14%' },
    { id: 5, name: 'MIL-101', existingEnergy: -1478, aiEnergy: -1656, improvement: '12%' },
  ];
  
  // Implementation Steps
  export const implementationSteps = [
    {
      id: 1,
      title: 'Design',
      description: 'Computational design of MOF structures using machine learning and molecular modeling. We trained AI on existing MOF data to predict optimal configurations.'
    },
    {
      id: 2,
      title: 'Simulate',
      description: 'Simulate MOF properties including carbon capture capacity and ground state energy using density functional theory and Grand Canonical Monte Carlo methods.'
    },
    {
      id: 3,
      title: 'Optimize',
      description: 'Optimize MOF structures based on simulation results and target properties. Our AI system performs iterative optimization to improve performance metrics.'
    },
    {
      id: 4,
      title: 'Validate',
      description: 'Experimentally validate optimized MOF structures in laboratory conditions. We synthesize and test top candidates for real-world performance verification.'
    }
  ];
  
  // MOF Structure Components with detailed descriptions
  export const mofStructureComponents = [
    { 
      id: 1, 
      name: 'Metal clusters', 
      description: 'Metal ions or clusters that serve as nodes in the MOF structure. Our AI optimizes the selection of metals (Zn, Cu, Zr, Al) based on binding energy and selectivity.' 
    },
    { 
      id: 2, 
      name: 'Organic linkers', 
      description: 'Organic molecules that connect metal clusters. We have developed novel linkers with functional groups specifically designed to enhance CO₂ adsorption capacity.' 
    },
    { 
      id: 3, 
      name: '3D frameworks', 
      description: 'Three-dimensional arrangements of nodes and linkers. Our AI algorithms predict optimal geometries that maximize surface area while maintaining structural stability.' 
    },
    { 
      id: 4, 
      name: 'Porous cavities', 
      description: 'Empty spaces within the MOF structure for gas adsorption. We have optimized pore size distributions to specifically target CO₂ molecules while rejecting competing gases.' 
    },
    { 
      id: 5, 
      name: 'High surface area', 
      description: 'Large internal surface area for interactions with guest molecules. Our MOFs achieve surface areas exceeding 4000 m²/g, significantly higher than conventional materials.' 
    },
  ];
  
  // Vision Elements
  export const visionElements = [
    { 
      id: 1, 
      title: 'Industrial Scale',
      text: 'Develop scalable MOF production methods for industrial applications',
      description: 'Our research aims to bridge the gap between laboratory synthesis and industrial production, making MOF-based carbon capture economically viable at scale.'
    },
    { 
      id: 2, 
      title: 'Enhanced Efficiency',
      text: 'Achieve carbon capture efficiency exceeding 45% improvement over traditional methods',
      description: 'By optimizing both the selectivity and capacity of our MOF designs, we aim to significantly outperform conventional carbon capture technologies while reducing energy penalties.'
    },
    { 
      id: 3, 
      title: 'AI Integration',
      text: 'Create AI systems capable of autonomous MOF design and optimization',
      description: 'We are developing self-improving AI algorithms that can design, test, and iterate on MOF structures without human intervention, dramatically accelerating the discovery process.'
    },
    { 
      id: 4, 
      title: 'Global Collaboration',
      text: 'Establish interdisciplinary collaboration framework for continued innovation',
      description: 'Our vision includes creating an open platform for researchers worldwide to share data, methods, and insights to accelerate MOF development for environmental applications.'
    },
    { 
      id: 5, 
      title: 'Climate Impact',
      text: 'Deploy MOF technologies globally to address climate change challenges',
      description: 'The ultimate goal is to implement our MOF technologies in industrial settings worldwide, contributing meaningfully to carbon reduction targets and mitigating climate change.'
    }
  ];
  
  // MOF Applications
  export const mofApplications = [
    {
      id: 1,
      name: 'Carbon Capture',
      description: 'MOFs designed specifically for capturing CO₂ from flue gases and direct air capture applications.',
      benefit: 'Reduces greenhouse gas emissions with higher efficiency and lower energy requirements than conventional methods.'
    },
    {
      id: 2,
      name: 'Gas Storage',
      description: 'High-capacity storage for hydrogen, methane, and other gases under moderate pressures.',
      benefit: 'Enables safer and more efficient storage of clean energy carriers for transportation and renewable energy storage.'
    },
    {
      id: 3,
      name: 'Catalysis',
      description: 'MOFs with catalytic properties for chemical transformations and carbon utilization.',
      benefit: 'Converts captured CO₂ into valuable products like methanol or formic acid, creating economic incentives for carbon capture.'
    },
    {
      id: 4,
      name: 'Gas Separation',
      description: 'Selective separation of gas mixtures based on molecular size, shape, and chemical affinity.',
      benefit: 'Purifies gas streams with lower energy consumption than traditional separation technologies.'
    },
    {
      id: 5,
      name: 'Sensors',
      description: 'MOF-based sensing platforms for detecting specific gases or environmental contaminants.',
      benefit: 'Provides highly selective and sensitive detection for environmental monitoring and safety applications.'
    }
  ];
  
  // Research Highlights
  export const researchHighlights = [
    {
      id: 1,
      title: 'Novel Functionalizing Approach',
      description: 'Developed a new method to functionalize MOF pores with nitrogen-rich groups, enhancing CO₂ binding.',
      result: 'Increased selectivity for CO₂ over N₂ by 300% compared to unfunctionalized MOFs.'
    },
    {
      id: 2,
      title: 'AI Prediction Accuracy',
      description: 'Our machine learning model can predict MOF performance with over 95% accuracy compared to DFT calculations.',
      result: 'Reduced computational screening time from weeks to minutes, enabling exploration of millions of potential structures.'
    },
    {
      id: 3,
      title: 'Mixed-Metal MOFs',
      description: 'Created bimetallic MOF nodes that combine the advantages of two different metals in a single structure.',
      result: 'Achieved both high stability and high adsorption capacity, qualities that are typically mutually exclusive.'
    },
    {
      id: 4,
      title: 'Scale-up Synthesis',
      description: 'Developed continuous flow synthesis methods for large-scale MOF production.',
      result: 'Successfully produced 5kg of optimized MOF material with consistent quality and performance.'
    }
  ];