import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Graphs.css";
function Graphs() {
  const [pieChart, setPieChart] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_pie = await axios.get(
          "https://levelsupermind-prehackathon-2.onrender.com/api/plotly_graph_pie"
        );
        const response_bar = await axios.get(
          "https://levelsupermind-prehackathon-2.onrender.com/api/plotly_graph_bar"
        );
        setPieChart(response_pie.data);
        setBarChart(response_bar.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="graphs-container flex flex-col">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <div className="graphs-content flex-col">
          {pieChart && (
            <div className="graph overflow-hidden">
              <h3>Pie Chart</h3>
              <Plot
                data={pieChart.data}
                layout={pieChart.layout}
                config={pieChart.config}
              />
            </div>
          )}
          {barChart && (
            <div className="graph overflow-hidden -z-10">
              <h3>Bar Chart</h3>
              <Plot
                data={barChart.data}
                layout={barChart.layout}
                className=" -z-10"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Graphs;
