from flask import Flask, jsonify
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
    app.run()
