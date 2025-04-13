import os  # For reading files from the filesystem
from pennylane import numpy as np  # PennyLane's numpy with autograd support
import pandas as pd  # For saving the final results into a CSV file
import pennylane as pl  # Main PennyLane library for quantum computations

"""
This function creates the Hamiltonian for simulating the Variational
Quantum Eigensolver.
We are simulating a 2-qubit Hamiltonian.
"""
def get_hamiltonian_from_cif(cif_file):
    # Coefficients of the Hamiltonian terms
    # Arbitrary values are set before we run our simulations
    coeffs = [0.5, -0.2, 0.3]
    
    # Quantum operators acting on the qubits
    ops = [
        pl.PauliX(0), # Pauli-X on qubit 0
        pl.PauliZ(0) @ pl.PauliZ(1), # Tensor product on qubits 0 and 1
        pl.PauliX(1) # Pauli-X on qubit 1
    ]
    
    # Create a Pennylane Hamiltonian Object
    H = pl.Hamiltonian(coeffs, ops)
    return H

"""
This function creates the answatz for the algorithm.We have to 
define the ansatz for the problem. An Ansatz is an educated guess 
we make and the algorithm optimizes our ansatz to calculate the 
ground state energy.
"""
def ansatz(params, wires):
    # First layer of single-qubit rotations
    pl.RX(params[0], wires=wires[0])
    pl.RY(params[1], wires=wires[1])
    
    # Apply entanglement between qubits
    pl.CNOT(wires=[wires[0], wires[1]])
    
    # Second layer of single-qubit rotations
    pl.RX(params[2], wires=wires[0])
    pl.RY(params[3], wires=wires[1])


"""
This function runs the Variational Quantum Eigensolver. We need a 
Hamiltonian to minimize the ground state energy. We are running a 
2-qubit system. We will be running this 100 times and optimizing after
every run.
"""
def run_vqe(H, num_qubits=2, max_iterations=100):
    # Use a PennyLane simulator backend with 2 qubits
    dev = pl.device("default.qubit", wires=num_qubits)

    # Define the quantum circuit as a QNode
    @pl.qnode(dev)
    def cost_fn(params): ##Define a cost function
        ansatz(params, wires=range(num_qubits))  # Build ansatz circuit
        return pl.expval(H)  # Measure expectation value of the Hamiltonian

    # Random initial parameters with gradient tracking enabled
    params = np.random.random(4, requires_grad=True)
    
    # Choose optimizer
    optimizer = pl.GradientDescentOptimizer(stepsize=0.1)

    # Track energy vs iteration
    energy_history = []

    # Optimization loop
    for i in range(max_iterations):
        params, energy = optimizer.step_and_cost(cost_fn, params)
        # Save iteration and energy as a tuple
        energy_history.append((i, float(energy)))
        
        if i % 10 == 0:
            print(f"Iteration {i}: Energy = {energy}")  # Log progress

    final_energy = energy_history[-1][1]
    return final_energy, params, energy_history

"""
This function saves the energy vs iteration data for all MOFs to a CSV file
"""
def save_energy_iterations_to_csv(energy_data_dict, output_file="energy_vs_iterations_tuple.csv"):
    # Create a list to hold all data rows
    all_data = []
    
    # For each MOF, add its energy history to the data
    for mof_name, energy_history in energy_data_dict.items():
        for iteration, energy in energy_history:
            all_data.append({
                "MOF": mof_name,
                "(x,y)": (iteration,energy)
            })
    
    # Create DataFrame and save to CSV
    df = pd.DataFrame(all_data)
    df.to_csv(output_file, index=False)
    print(f"Energy vs iteration data saved to '{output_file}'")

"""
This is the main function of the program. This executes 
the program.
"""
def main():
    """
    Main function that:
        - Reads all CIF files from a directory.
        - Builds Hamiltonians for each MOF.
        - Runs VQE for each MOF to get ground state energy.
        - Stores results in a CSV file.
        - Tracks and saves energy vs iteration data for plotting.
    """
    # Directory where CIF files are located
    cif_directory = "generated mofs"
    
    results = []  # Will store MOF name and energy
    energy_data = {}  # Will store energy vs iteration data for each MOF

    # Iterate through all files in the directory
    for file in os.listdir(cif_directory):
        if file.endswith(".cif"):  # Only process .cif files
            cif_path = os.path.join(cif_directory, file)
            print(f"Processing {file}...")
            
            # Simulate building the Hamiltonian
            H = get_hamiltonian_from_cif(cif_path)
            
            # Run VQE to get the lowest energy and energy history
            energy, params, energy_history = run_vqe(H)
            
            # Store energy history for this MOF
            mof_name = file.replace(".cif", "")
            energy_data[mof_name] = energy_history
            
            print(f"Finished {file} with minimum energy: {energy:.4f}\n")
            
            # Store result for this MOF
            results.append({"MOF": file, "Ground_State_Energy": energy})
    
    # Save all final energies to a CSV file
    df = pd.DataFrame(results)
    df.to_csv("ground_state_energies.csv", index=False)
    print("All results saved to 'ground_state_energies.csv'.")
    
    # Save energy vs iteration data for all MOFs
    save_energy_iterations_to_csv(energy_data)

# Run the script if it's executed directly (not imported)
if __name__ == "__main__":
    main()