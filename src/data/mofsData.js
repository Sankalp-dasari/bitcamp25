// Team Members Data
export const teamMembers = [
    {
      id: 1,
      name: 'Aditya Sunke',
      role: 'CS major',
      bio: 'Minor in Quantum Information Science and Engineering. Experience in Java, Python, C, Qiskit and Pennylane. Experience with Post-Quantum Cryptographic Protocols.',
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEciFzeVJNPNA/profile-displayphoto-shrink_800_800/B56ZTPrr9NHQAc-/0/1738651124201?e=1749686400&v=beta&t=pcgLJnkpa9XwNfkXcoMW94ZTw-n-gforPk2Yn5LWrIY"
    },
    {
      id: 2,
      name: 'Aarya Anup',
      role: 'CS major',
      bio: 'Minor in Quantum Information Science and Engineering. Experience in Qiskit, Pennylane, Python, Java, C and C++. Working on research with Professor on Quantum Computing with Neutral Atoms.',
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQEVEU9FOU4q8g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712284337794?e=1749686400&v=beta&t=LdimbM10GBP5n-l71f60jhT55XD_lN_7V-uCpArQNFw"
    },
    {
      id: 3,
      name: 'Sophia Chukka',
      role: 'CMDA major',
      bio: 'Minor in CS and Math, Experience in Programming Languages: Python, Java, SQL, R, C, Matlab, React; Libraries: Pandas, NumPy, Matplotlib, Tableau, Power BI.  Working on Linear Algebra and Coding Theory Research at VT Math Department.',
      imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQGlkfvPIciH2Q/profile-displayphoto-shrink_800_800/B4EZYREO_9HgAk-/0/1744043045417?e=1749686400&v=beta&t=Kt0_wH2Rr-8vAtN4_fiUE9eKz7BqAme-gUYHLuHOqcc"
    },
    {
      id: 4,
      name: 'Sankalp Dasari',
      role: 'CS major',
      bio: 'Minor in Cybersecurity, Experience in Java, Python, C, AI, ML, Full Stack Development,cryptography. Working on research related to computer vision andreal time tracking. ',
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEJpGQcseWd9w/profile-displayphoto-shrink_800_800/B56ZYt4.CZGsAk-/0/1744526632779?e=1750291200&v=beta&t=1JmncC1sKAhvx7l6bgKP9xyQH8gmWLIyhpB0rBL6VyE"
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
      title: 'Gather Database',
      description: 'Gather Database from Materials Cloud, an open source software with 324K total MOFs and nearly 8K MOFs screened for Carbon Capture'
    },
    {
      id: 2,
      title: 'Implement the VQE',
      description: 'Run each MOF through the VQE to determine the ground state energy value from the database'

    },
    {
      id: 3,
      title: 'Neural Network',
      description: 'Evaluate the existing MOFs’ ground state energy and train a neural network to generate a new set of MOFs'
    },
    {
      id: 4,
      title: 'Creating CIF Files',
      description: 'Use the predicted properties of the new MOFs to create CIF files for simulation with the VQE algorithm'
    },
    {
      id: 5,
      title: 'Run VQE on new MOFs',
      description: 'Compare the ground state energies and CO2 uptake with existing MOFs and verify structure of new MOFs using VESTA'
    }
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