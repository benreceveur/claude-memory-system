# Data Cleaning & Transformation Skill

## Description
ETL pipelines, data preparation, cleaning messy datasets, handling missing values, normalization, and data quality validation.

## When to Use
- Raw data ingestion
- Data quality issues
- Preparing data for analysis
- ETL pipeline development

## Common Issues & Solutions

### 1. Missing Data
```python
import pandas as pd

# Detection
df.isnull().sum()
df.info()

# Strategies
df.dropna()  # Remove rows with missing values
df.fillna(value)  # Fill with specific value
df.fillna(df.mean())  # Fill with mean
df.interpolate()  # Interpolate missing values
```

### 2. Duplicates
```python
# Find duplicates
duplicates = df.duplicated()
df[duplicates]

# Remove duplicates
df.drop_duplicates(subset=['column'], keep='first')
```

### 3. Data Type Conversion
```python
# Convert types
df['date'] = pd.to_datetime(df['date'])
df['price'] = df['price'].astype(float)
df['category'] = df['category'].astype('category')
```

### 4. Outlier Detection
```python
# IQR method
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
outliers = (df['value'] < (Q1 - 1.5 * IQR)) | (df['value'] > (Q3 + 1.5 * IQR))

# Z-score method
from scipy import stats
z_scores = np.abs(stats.zscore(df['value']))
outliers = z_scores > 3
```

### 5. Normalization
```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization (mean=0, std=1)
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df)

# Min-Max scaling (0 to 1)
scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df)
```

### 6. String Cleaning
```python
# Lowercase, trim whitespace
df['text'] = df['text'].str.lower().str.strip()

# Remove special characters
df['text'] = df['text'].str.replace('[^a-zA-Z0-9\s]', '', regex=True)

# Consistent formatting
df['phone'] = df['phone'].str.replace(r'\D', '', regex=True)
```

## Data Quality Checks
```python
def validate_data(df):
    checks = {
        'no_nulls': df.isnull().sum().sum() == 0,
        'no_duplicates': df.duplicated().sum() == 0,
        'correct_types': all(df.dtypes == expected_types),
        'valid_ranges': all((df['age'] >= 0) & (df['age'] <= 120)),
        'referential_integrity': df['foreign_key'].isin(ref_table['id']).all()
    }
    return checks
```

## Best Practices
- Document transformations
- Validate assumptions
- Log data quality metrics
- Create reproducible pipelines
- Handle edge cases
- Test with real data

## Quality Checklist
- ✅ Missing values handled
- ✅ Duplicates removed
- ✅ Outliers addressed
- ✅ Data types correct
- ✅ Normalization applied
- ✅ Validation passed
- ✅ Pipeline reproducible
