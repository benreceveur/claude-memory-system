# Data Visualization Skill

## Description
Create professional charts, graphs, and dashboards using matplotlib, seaborn, and plotly. Includes static and interactive visualizations.

## When to Use
- Exploratory data analysis
- Presenting insights
- Creating dashboards
- Report generation

## Chart Types & Use Cases

### 1. Line Charts
**Use**: Trends over time
```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
plt.plot(dates, values, marker='o')
plt.title('Trend Over Time')
plt.xlabel('Date')
plt.ylabel('Value')
plt.grid(True)
plt.show()
```

### 2. Bar Charts
**Use**: Comparing categories
```python
import seaborn as sns

sns.barplot(data=df, x='category', y='value')
plt.title('Comparison by Category')
plt.xticks(rotation=45)
plt.show()
```

### 3. Scatter Plots
**Use**: Relationships between variables
```python
plt.scatter(x, y, alpha=0.5, c=colors, cmap='viridis')
plt.colorbar(label='Z Value')
plt.xlabel('X Variable')
plt.ylabel('Y Variable')
plt.show()
```

### 4. Heatmaps
**Use**: Correlation matrices
```python
import seaborn as sns

correlation = df.corr()
sns.heatmap(correlation, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.show()
```

### 5. Interactive Plots (Plotly)
```python
import plotly.express as px

fig = px.scatter(df, x='x', y='y', color='category',
                 hover_data=['name'], title='Interactive Scatter')
fig.show()
```

## Best Practices
1. **Design**
   - Clear titles and labels
   - Appropriate chart type
   - Readable fonts
   - Color accessibility
   - Consistent styling

2. **Data Integrity**
   - Don't mislead (start y-axis at 0 for bar charts)
   - Show uncertainty (error bars, confidence intervals)
   - Avoid chart junk
   - Label data points when helpful

3. **Professional Styling**
```python
# Set global style
plt.style.use('seaborn-v0_8-darkgrid')

# Custom colors
colors = ['#1f77b4', '#ff7f0e', '#2ca02c']

# Save high-quality
plt.savefig('plot.png', dpi=300, bbox_inches='tight')
```

## Quality Checklist
- ✅ Appropriate chart type
- ✅ Clear labels and title
- ✅ Readable font size
- ✅ Color-blind friendly
- ✅ Legend if needed
- ✅ High resolution export
- ✅ Data accurately represented
