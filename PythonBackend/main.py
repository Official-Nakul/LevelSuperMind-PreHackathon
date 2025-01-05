import os
from flask import Flask
from Graphs import generate_pie_chart, generate_bar_chart
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def check():
    return "hii!"

@app.route('/api/plotly_graph_pie', methods=['GET'])
def plotly_graph_pie():
    pie_chart = generate_pie_chart()  # Returns JSON string
    return pie_chart

@app.route('/api/plotly_graph_bar', methods=['GET'])
def plotly_graph_bar():
    bar_chart = generate_bar_chart()  # Returns JSON string
    return bar_chart

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets PORT
    app.run(host='0.0.0.0', port=port)