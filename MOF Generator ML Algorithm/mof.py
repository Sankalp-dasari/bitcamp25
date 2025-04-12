import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Set random seeds for reproducibility
np.random.seed(42)
torch.manual_seed(42)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(42)

# Set device (GPU if available, otherwise CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# 1. LOAD AND PREPARE DATA
print("Loading data...")
df = pd.read_csv('top_MOFs_screening_csv.csv')

# Define important features and targets
numerical_features = [
    'volume [A^3]',
    'surface_area [m^2/g]',
    'void_fraction',
    'void_volume [cm^3/g]',
    'largest_free_sphere_diameter [A]',
    'weight [u]'
]

categorical_features = [
    'topology',
    'functional_groups'
]

# Define target columns
ground_state_col = 'Ground_State_Energy'  # Lower is better
co2_uptake_col = 'CO2_uptake_P0.15bar_T298K [mmol/g]'  # Higher is better
selectivity_col = 'CO2/N2_selectivity'  # Higher is better
heat_adsorption_col = 'heat_adsorption_CO2_P0.15bar_T298K [kcal/mol]'  # Higher is better

# Convert string values to numeric
for col in numerical_features + [ground_state_col, co2_uptake_col, selectivity_col, heat_adsorption_col]:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Remove rows with missing values in target and key feature columns
df = df.dropna(subset=[ground_state_col, co2_uptake_col, selectivity_col] + numerical_features)
print(f"Dataset shape after cleaning: {df.shape}")

# Create preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numerical_features),
        ('cat', Pipeline([
            ('imputer', SimpleImputer(strategy='most_frequent')),
            ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
        ]), categorical_features)
    ])

# Split the data
X = df[numerical_features + categorical_features]
y_gs = df[ground_state_col].values
y_co2 = df[co2_uptake_col].values
y_sel = df[selectivity_col].values
y_heat = df[heat_adsorption_col].values

X_train, X_test, y_gs_train, y_gs_test, y_co2_train, y_co2_test, y_sel_train, y_sel_test, y_heat_train, y_heat_test = train_test_split(
    X, y_gs, y_co2, y_sel, y_heat, test_size=0.2, random_state=42
)

# Print target ranges
print(f"\nGround State Energy: {y_gs.min():.4f} to {y_gs.max():.4f} eV")
print(f"CO2 Uptake: {y_co2.min():.4f} to {y_co2.max():.4f} mmol/g")
print(f"CO2/N2 Selectivity: {y_sel.min():.4f} to {y_sel.max():.4f}")
print(f"Heat Adsorption: {y_heat.min():.4f} to {y_heat.max():.4f} kcal/mol")

# Preprocess the data
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)

# Get dimensionality
input_dim = X_train_processed.shape[1]
print(f"Input dimension after preprocessing: {input_dim}")

# Convert to PyTorch tensors
X_train_tensor = torch.FloatTensor(X_train_processed).to(device)
X_test_tensor = torch.FloatTensor(X_test_processed).to(device)

y_gs_train_tensor = torch.FloatTensor(y_gs_train.reshape(-1, 1)).to(device)
y_gs_test_tensor = torch.FloatTensor(y_gs_test.reshape(-1, 1)).to(device)

y_co2_train_tensor = torch.FloatTensor(y_co2_train.reshape(-1, 1)).to(device)
y_co2_test_tensor = torch.FloatTensor(y_co2_test.reshape(-1, 1)).to(device)

y_sel_train_tensor = torch.FloatTensor(y_sel_train.reshape(-1, 1)).to(device)
y_sel_test_tensor = torch.FloatTensor(y_sel_test.reshape(-1, 1)).to(device)

y_heat_train_tensor = torch.FloatTensor(y_heat_train.reshape(-1, 1)).to(device)
y_heat_test_tensor = torch.FloatTensor(y_heat_test.reshape(-1, 1)).to(device)

# Create dataloaders
batch_size = 32
train_dataset = TensorDataset(X_train_tensor, y_gs_train_tensor, y_co2_train_tensor, y_sel_train_tensor, y_heat_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

# 2. CREATE PREDICTION MODELS
class PropertyPredictor(nn.Module):
    def __init__(self, input_dim):
        super(PropertyPredictor, self).__init__()
        self.model = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
    
    def forward(self, x):
        return self.model(x)

# Create separate models for each property
ground_state_model = PropertyPredictor(input_dim).to(device)
co2_uptake_model = PropertyPredictor(input_dim).to(device)
selectivity_model = PropertyPredictor(input_dim).to(device)
heat_adsorption_model = PropertyPredictor(input_dim).to(device)

# Training function
def train_model(model, X_train, y_train, X_test, y_test, property_name, epochs=50):
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    train_losses = []
    
    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()
        
        # Forward pass
        outputs = model(X_train)
        loss = criterion(outputs, y_train)
        
        # Backward pass and optimize
        loss.backward()
        optimizer.step()
        
        train_losses.append(loss.item())
        
        if (epoch + 1) % 10 == 0:
            print(f'Epoch {epoch+1}/{epochs}, {property_name} Loss: {loss.item():.4f}')
    
    # Evaluate on test data
    model.eval()
    with torch.no_grad():
        test_outputs = model(X_test)
        test_loss = criterion(test_outputs, y_test)
        
        # Convert to numpy for metrics
        y_pred = test_outputs.cpu().numpy()
        y_true = y_test.cpu().numpy()
        
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))
        r2 = r2_score(y_true, y_pred)
        
    print(f"{property_name} - Test Loss: {test_loss.item():.4f}, RMSE: {rmse:.4f}, R²: {r2:.4f}")
    return train_losses, rmse, r2

# Train each model
print("\nTraining Ground State Energy model...")
gs_losses, gs_rmse, gs_r2 = train_model(
    ground_state_model, X_train_tensor, y_gs_train_tensor, 
    X_test_tensor, y_gs_test_tensor, "Ground State Energy"
)

print("\nTraining CO2 Uptake model...")
co2_losses, co2_rmse, co2_r2 = train_model(
    co2_uptake_model, X_train_tensor, y_co2_train_tensor, 
    X_test_tensor, y_co2_test_tensor, "CO2 Uptake"
)

print("\nTraining Selectivity model...")
sel_losses, sel_rmse, sel_r2 = train_model(
    selectivity_model, X_train_tensor, y_sel_train_tensor, 
    X_test_tensor, y_sel_test_tensor, "Selectivity"
)

print("\nTraining Heat Adsorption model...")
heat_losses, heat_rmse, heat_r2 = train_model(
    heat_adsorption_model, X_train_tensor, y_heat_train_tensor, 
    X_test_tensor, y_heat_test_tensor, "Heat Adsorption"
)

# 3. AUTOENCODER FOR MOF GENERATION
class Autoencoder(nn.Module):
    def __init__(self, input_dim, latent_dim=16):
        super(Autoencoder, self).__init__()
        
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, latent_dim),
            nn.ReLU()
        )
        
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 32),
            nn.ReLU(),
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, input_dim),
            nn.Sigmoid()  # Output normalized between 0-1
        )
    
    def forward(self, x):
        z = self.encoder(x)
        return self.decoder(z)
    
    def encode(self, x):
        return self.encoder(x)
    
    def decode(self, z):
        return self.decoder(z)

# Create and train the autoencoder
latent_dim = 16
autoencoder = Autoencoder(input_dim, latent_dim).to(device)
ae_optimizer = optim.Adam(autoencoder.parameters(), lr=0.001)
ae_criterion = nn.MSELoss()

# Training loop for autoencoder
print("\nTraining autoencoder for MOF generation...")
ae_epochs = 50
ae_losses = []

for epoch in range(ae_epochs):
    autoencoder.train()
    running_loss = 0.0
    
    for batch_data in train_loader:
        inputs = batch_data[0]  # Just the features
        
        ae_optimizer.zero_grad()
        outputs = autoencoder(inputs)
        loss = ae_criterion(outputs, inputs)
        loss.backward()
        ae_optimizer.step()
        running_loss += loss.item()
    
    avg_loss = running_loss / len(train_loader)
    ae_losses.append(avg_loss)
    
    if (epoch + 1) % 10 == 0:
        print(f'Epoch {epoch+1}/{ae_epochs}, Loss: {avg_loss:.4f}')

# 4. GENERATE NEW MOFs
def generate_mofs(num_samples=200):
    """Generate new MOFs using the autoencoder and evaluate their properties"""
    autoencoder.eval()
    ground_state_model.eval()
    co2_uptake_model.eval()
    selectivity_model.eval()
    heat_adsorption_model.eval()
    
    with torch.no_grad():
        # Sample from latent space with bias toward high-performing MOFs
        # Get encodings of good MOFs (low ground state energy, high CO2 uptake)
        
        # Top 20% for ground state (lowest values)
        gs_indices = np.argsort(y_gs_train)[:int(len(y_gs_train)*0.2)]
        
        # Top 20% for CO2 uptake (highest values)
        co2_indices = np.argsort(y_co2_train)[-int(len(y_co2_train)*0.2):]
        
        # Find intersection of these indices to get MOFs good at both
        good_indices = np.intersect1d(gs_indices, co2_indices)
        
        # If intersection is too small, use union instead
        if len(good_indices) < 10:
            good_indices = np.union1d(gs_indices, co2_indices)
            if len(good_indices) > 100:  # Limit the number if union is too large
                good_indices = good_indices[:100]
        
        print(f"Using {len(good_indices)} high-performing MOFs as generation seeds")
        
        # Use these MOFs as seed for generation
        good_features = X_train_tensor[good_indices]
        
        # Encode these high-performing MOFs
        encodings = autoencoder.encode(good_features)
        
        # Calculate mean and std of these encodings
        encoding_mean = torch.mean(encodings, dim=0)
        encoding_std = torch.std(encodings, dim=0)
        
        # Sample from this distribution with some randomness
        z_samples = []
        for _ in range(num_samples):
            # Sample with bias towards high-performing MOFs
            z = encoding_mean + encoding_std * torch.randn(latent_dim).to(device)
            z_samples.append(z)
        
        z_tensor = torch.stack(z_samples)
        
        # Generate MOF features
        generated_features = autoencoder.decode(z_tensor)
        
        # Predict properties
        predicted_gs = ground_state_model(generated_features).cpu().numpy()
        predicted_co2 = co2_uptake_model(generated_features).cpu().numpy()
        predicted_sel = selectivity_model(generated_features).cpu().numpy()
        predicted_heat = heat_adsorption_model(generated_features).cpu().numpy()
        
        return (
            generated_features.cpu().numpy(), 
            predicted_gs, 
            predicted_co2, 
            predicted_sel,
            predicted_heat
        )

# Generate MOFs
print("\nGenerating new MOFs...")
num_to_generate = 200
generated_features, predicted_gs, predicted_co2, predicted_sel, predicted_heat = generate_mofs(num_to_generate)

# Calculate ranks for each property
gs_ranks = np.argsort(np.argsort(predicted_gs.flatten()))  # Lower is better, so don't reverse
co2_ranks = np.argsort(np.argsort(-predicted_co2.flatten()))  # Higher is better, so reverse with negative
sel_ranks = np.argsort(np.argsort(-predicted_sel.flatten()))  # Higher is better, so reverse with negative
heat_ranks = np.argsort(np.argsort(-predicted_heat.flatten()))  # Higher is better, so reverse with negative

# Two-stage ranking method
# First filter by ground state energy and CO2 uptake, then consider other properties
print("\nRanking MOFs using two-stage method prioritizing ground state energy and CO2 uptake...")
gs_threshold = np.percentile(gs_ranks, 30)  # Top 30% in ground state energy
co2_threshold = np.percentile(co2_ranks, 30)  # Top 30% in CO2 uptake

print(f"Ground state energy threshold (rank): {gs_threshold}")
print(f"CO2 uptake threshold (rank): {co2_threshold}")

# Find MOFs that meet both primary criteria
primary_candidates = []
for i in range(num_to_generate):
    if gs_ranks[i] <= gs_threshold and co2_ranks[i] <= co2_threshold:
        primary_candidates.append(i)

print(f"Found {len(primary_candidates)} MOFs meeting both primary criteria")

# If we have enough candidates from the first filter, rank them by secondary criteria
if len(primary_candidates) >= 10:
    # Calculate secondary score using selectivity and heat adsorption
    secondary_scores = {}
    for idx in primary_candidates:
        secondary_score = sel_ranks[idx] * 0.5 + heat_ranks[idx] * 0.5
        secondary_scores[idx] = secondary_score
    
    # Sort by secondary score (lower is better)
    sorted_candidates = sorted(secondary_scores.items(), key=lambda x: x[1])
    top_indices = [idx for idx, _ in sorted_candidates[:10]]
else:
    # Not enough candidates meeting both criteria, use weighted ranking instead
    print("Not enough candidates meeting both primary criteria. Using weighted ranking instead.")
    weighted_ranks = (
        gs_ranks * 0.35 +  # Ground state energy (35%)
        co2_ranks * 0.35 + # CO2 uptake (35%)
        sel_ranks * 0.15 + # Selectivity (15%)
        heat_ranks * 0.15  # Heat adsorption (15%)
    )
    top_indices = np.argsort(weighted_ranks)[:10]

# Calculate percentile-based scores for display
combined_scores = []
for i in range(num_to_generate):
    # Calculate percentile-based scores (0-100 scale)
    gs_percentile = 100 * (1 - (gs_ranks[i] / len(gs_ranks)))  # Reverse for ground state
    co2_percentile = 100 * (1 - (co2_ranks[i] / len(co2_ranks)))
    sel_percentile = 100 * (1 - (sel_ranks[i] / len(sel_ranks)))
    heat_percentile = 100 * (1 - (heat_ranks[i] / len(heat_ranks)))
    
    # Weighted average of percentiles
    score = (
        gs_percentile * 0.45 +
        co2_percentile * 0.45 +
        sel_percentile * 0.05 +
        heat_percentile * 0.05
    )
    combined_scores.append(score)

# Convert generated MOFs to original feature space
def processed_to_original_format(processed_features):
    """Convert preprocessed features back to original format"""
    result = {}
    
    # Reverse transform numerical features
    num_transformer = preprocessor.transformers_[0][1]
    num_scaler = num_transformer.named_steps['scaler']
    
    for i, feature in enumerate(numerical_features):
        # Find feature index in preprocessed data
        feature_idx = list(preprocessor.get_feature_names_out()).index(f'num__{feature}')
        # Reverse scaling
        orig_value = processed_features[feature_idx] * num_scaler.scale_[i] + num_scaler.mean_[i]
        result[feature] = orig_value
    
    # Decode categorical features
    cat_transformer = preprocessor.transformers_[1][1]
    cat_encoder = cat_transformer.named_steps['onehot']
    
    for i, feature in enumerate(categorical_features):
        # Get categories for this feature
        categories = cat_encoder.categories_[i]
        
        # Get offset in column names
        prefix = f'cat__{feature}_'
        matching_cols = [col for col in preprocessor.get_feature_names_out() if col.startswith(prefix)]
        if matching_cols:
            start_idx = list(preprocessor.get_feature_names_out()).index(matching_cols[0])
            
            # Find which category has highest value
            category_values = processed_features[start_idx:start_idx + len(categories)]
            category_idx = np.argmax(category_values)
            if 0 <= category_idx < len(categories):
                result[feature] = categories[category_idx]
            else:
                result[feature] = "Unknown"  # Fallback if index is out of range
        else:
            result[feature] = "Unknown"  # Fallback if no matching columns
    
    return result

# Print results for top MOFs
print("\nTop Generated MOFs:")
print("------------------")

top_mofs_data = []

for rank, idx in enumerate(top_indices):
    try:
        mof_dict = processed_to_original_format(generated_features[idx])
        
        # Add predicted properties and score
        mof_dict['mof_id'] = f"GEN-MOF-{rank+1}"
        mof_dict['predicted_ground_state_energy'] = float(predicted_gs[idx][0])
        mof_dict['predicted_co2_uptake'] = float(predicted_co2[idx][0])
        mof_dict['predicted_selectivity'] = float(predicted_sel[idx][0])
        mof_dict['predicted_heat_adsorption'] = float(predicted_heat[idx][0])
        mof_dict['performance_score'] = float(combined_scores[idx])
        
        top_mofs_data.append(mof_dict)
        
        # Print details
        print(f"MOF #{rank+1}")
        print(f"MOF_ID: {mof_dict['mof_id']}")
        print(f"Predicted Ground State Energy: {mof_dict['predicted_ground_state_energy']:.4f} eV")
        print(f"Predicted CO2 Uptake: {mof_dict['predicted_co2_uptake']:.4f} mmol/g")
        print(f"Predicted CO2/N2 Selectivity: {mof_dict['predicted_selectivity']:.4f}")
        print(f"Predicted Heat Adsorption: {mof_dict['predicted_heat_adsorption']:.4f} kcal/mol")
        print(f"Generated Surface Area: {mof_dict['surface_area [m^2/g]']:.1f} m²/g")
        print(f"Generated Void Fraction: {mof_dict['void_fraction']:.4f}")
        print(f"Suggested Topology: {mof_dict['topology']}")
        print(f"Suggested Functional Groups: {mof_dict['functional_groups']}")
        print(f"Performance Score: {mof_dict['performance_score']:.1f}")
        print("------------------")
    except Exception as e:
        print(f"Error processing MOF #{rank+1}: {e}")

# Save results to CSV
if top_mofs_data:
    top_mofs_df = pd.DataFrame(top_mofs_data)
    top_mofs_df.to_csv('generated_top_mofs.csv', index=False)
    print("\nBest MOFs saved to 'generated_top_mofs.csv'")
else:
    print("\nWarning: No valid MOFs generated to save to CSV")

# Create visualization comparing original vs generated MOFs
plt.figure(figsize=(12, 8))

# Plot 1: Ground State Energy vs CO2 Uptake
plt.subplot(2, 2, 1)
plt.scatter(y_gs_train, y_co2_train, alpha=0.5, label='Original MOFs', s=10)
if top_mofs_data:
    plt.scatter([m['predicted_ground_state_energy'] for m in top_mofs_data], 
               [m['predicted_co2_uptake'] for m in top_mofs_data], 
               color='red', s=100, label='Generated MOFs')
plt.xlabel('Ground State Energy (eV)')
plt.ylabel('CO2 Uptake (mmol/g)')
plt.title('Ground State Energy vs CO2 Uptake')
plt.legend()

# Plot 2: CO2 Uptake vs Selectivity
plt.subplot(2, 2, 2)
plt.scatter(y_co2_train, y_sel_train, alpha=0.5, label='Original MOFs', s=10)
if top_mofs_data:
    plt.scatter([m['predicted_co2_uptake'] for m in top_mofs_data], 
               [m['predicted_selectivity'] for m in top_mofs_data], 
               color='red', s=100, label='Generated MOFs')
plt.xlabel('CO2 Uptake (mmol/g)')
plt.ylabel('CO2/N2 Selectivity')
plt.title('CO2 Uptake vs Selectivity')
plt.legend()

# Plot 3: Ground State Energy Distribution
plt.subplot(2, 2, 3)
plt.hist(y_gs_train, bins=30, alpha=0.5, label='Original MOFs')
if top_mofs_data:
    plt.axvline(np.mean([m['predicted_ground_state_energy'] for m in top_mofs_data]), 
                color='red', linestyle='--', linewidth=2,
                label='Avg. Generated')
    for gs in [m['predicted_ground_state_energy'] for m in top_mofs_data]:
        plt.axvline(gs, color='red', alpha=0.3)
plt.xlabel('Ground State Energy (eV)')
plt.ylabel('Count')
plt.title('Ground State Energy Distribution')
plt.legend()

# Plot 4: CO2 Uptake Distribution
plt.subplot(2, 2, 4)
plt.hist(y_co2_train, bins=30, alpha=0.5, label='Original MOFs')
if top_mofs_data:
    plt.axvline(np.mean([m['predicted_co2_uptake'] for m in top_mofs_data]), 
                color='red', linestyle='--', linewidth=2,
                label='Avg. Generated')
    for co2 in [m['predicted_co2_uptake'] for m in top_mofs_data]:
        plt.axvline(co2, color='red', alpha=0.3)
plt.xlabel('CO2 Uptake (mmol/g)')
plt.ylabel('Count')
plt.title('CO2 Uptake Distribution')
plt.legend()

plt.tight_layout()
plt.savefig('mof_generation_results.png')
print("Results visualization saved to 'mof_generation_results.png'")

print("\nDone! MOF generation complete.")