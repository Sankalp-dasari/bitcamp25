# **[CarbonQapture - Bitcamp 2025](https://bitcamp25.vercel.app/)**
Implementing a **Variational Quantum Eigensolver (VQE)** to simulate the interactions between **Metal-Organic Frameworks (MOFs)** and Carbon Dioxide molecules to simulate **Carbon Capture**.

Harnessing quantum computing to accelerate the discovery of next-generation metal-organic frameworks (MOFs) for efficient carbon dioxide capture.

---

## Inspiration

**Quantum Computing** promises a new era of computing that uses the **quantum nature** of a particle to **perform computations exponentially faster**. With **climate change** and greenhouse gases like **Carbon Dioxide** at the forefront of global concerns, **carbon capture** has emerged as a critical area of research. Metal-organic frameworks (MOFs) are **highly porous materials** capable of selectively **adsorbing CO₂**, making them prime candidates for sustainable solutions. However, the vast design space of MOFs makes discovery a challenge — this is where quantum concepts like the  **Variational Quantum Eigensolver (VQE)** comes in.

---

## What It Does

This project integrates **quantum simulation** and **machine learning** to:

- Simulate MOFs using the **Variational Quantum Eigensolver (VQE)** algorithm.
- Estimate **ground-state energies** to assess CO₂ capture efficiency.
- Train an **AI model** to predict and **propose novel MOF structures** optimized for carbon capture.
- **Test out the proposed MOF structures** on the VQE algorithm to **analyze ground state energy**.
- Output predictions, highlighting performance metrics like **uptake, selectivity, and heat of adsorption**.

---

## How It Works

1. **CIF Parsing**: Structural data from a real [MOF Dataset](https://www.materialscloud.org/discover/mofs#mcloudHeader) (in `.cif` format) is parsed.
2. **Hamiltonian Construction**: A simplified 2-qubit molecular Hamiltonian is built for each structure.
3. **Quantum Simulation**: Using PennyLane, VQE estimates the ground state energy of each MOF-CO₂ system.
4. **AI Model**: A neural network is trained on simulation outputs and pre-existing MOF dataset to propose new MOF structures.
5. **Results**: Energies and material properties are saved in `.csv` format and visualized via plots.

---

# Technologies Used

## Python Libraries
- **[NumPy](https://numpy.org/doc/)**: Fundamental package for numerical computations in Python.
- **[Pandas](https://pandas.pydata.org/docs/)**: Data structures and data analysis tools.
- **[PyTorch](https://pytorch.org/docs/)**: Deep learning framework for building and training neural networks.
- **[scikit-learn](https://scikit-learn.org/stable/documentation.html)**: Machine learning library offering tools for data preprocessing, classification, regression, and more.
- **[Matplotlib](https://matplotlib.org/stable/contents.html)**: Comprehensive library for creating static, animated, and interactive visualizations.
- **[os](https://docs.python.org/3/library/os.html)**: Module providing a way of using operating system-dependent functionality.

## Quantum Computing
- **[PennyLane](https://docs.pennylane.ai/)**: Cross-platform Python library for quantum computing and machine learning, enabling hybrid quantum-classical computations.

## CUDA
- **[CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit)**: NVIDIA's parallel computing platform and programming model for GPU acceleration.

## Frontend Development
- **[React](https://reactjs.org/docs/getting-started.html)**: JavaScript library for building user interfaces.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**: Programming language that enables interactive web pages.
