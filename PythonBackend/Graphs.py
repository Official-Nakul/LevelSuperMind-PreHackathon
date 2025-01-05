import numpy as np
import pandas as pd
import plotly.express as px
import plotly.io as pio

df = pd.read_csv("mock_social_media_data_100tf.csv")
metrics_columns = ['likes', 'comments', 'shares', 'views']
df_melted = pd.melt(df, id_vars=['post_type'], value_vars=metrics_columns,
                    var_name='metric', value_name='value')

df_mean = df_melted.groupby(['post_type', 'metric'], as_index=False)['value'].mean()

def generate_bar_chart():
    fig = px.bar(df_mean, x='metric', y='value', color='post_type',
                 barmode='group', title="Metrics by Post Type", )
    bar_chart_json = pio.to_json(fig)
    return bar_chart_json
def generate_pie_chart():
    fig = px.pie(df,
                 names='post_type',
                 title="Distribution of Post Types",
                 color='post_type',
                 color_discrete_map={'carousel': 'blue', 'image': 'orange', 'reels': 'green'})
    pie_chart_json = pio.to_json(fig)
    return pie_chart_json
generate_pie_chart()