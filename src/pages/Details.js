import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import './Details.css'

export default function Details() {
  const queryParameter = useLocation().search;
  const queryString = new URLSearchParams(queryParameter);
  const query = queryString.get("q");
  var date = new Date().toISOString().split("T")[0];
  var pastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0];
  const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${pastYear}/${date}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.REACT_APP_KEY}`;
  const urldetails = `https://api.polygon.io/v3/reference/tickers/${query}?date=${date}&apiKey=${process.env.REACT_APP_KEY}`
  // change url to 1 year stock data from today, then organize view to show the last 1m,3m,6m,1yr
  const { data, isPending, error } = useFetch(url);
  const {data:stockdetails, isPending:stPending, error:sterror} = useFetch(urldetails)

  return (
    <div className="details">
      {error && <>{error}</>}
      {isPending && <>loading...</>}        
      {data && stockdetails && (
        <>
              <div className="stocktitle">
              <p>{data.ticker}</p>
              <h1>{stockdetails.results.name}</h1>
              <h1>{data.results[0].vw}</h1>
              </div>
        <Plot className="graph"
          data={[
            {
              x: data.results.map((time) => new Date(time.t).toLocaleDateString("en-US")),
              
              y: data.results.map((value) => value.vw),
              
              type: "scatter",
              
              mode: "lines",
              
              marker: { color: "white" },
            },
          ]}
          layout={{
            font: {
              family: "Courier New, monospace",
              size: 18,
              color: "#ffffff",
            },
            width: 350,
            height: 500,
            margin: {
              l: 0,
              r: 0,
              b: 20,
              t: 20,
              pad: 5
            }, 
            title: "",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            xaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
              fixedrange: true,
              type: Date,
              rangeselector:{
                visible : true,
                rangeslider:true,
                buttons : [{
                  step: 'month',
                  stepmode: 'backward',
                  count: 1,
                  label: '1m'
                }, {
                  step: 'month',
                  stepmode: 'backward',
                  count: 3,
                  label: '3m'
                }, {
                  step: 'month',
                  stepmode: 'backward',
                  count: 6,
                  label: '6m'
                },{
                  step: 'year',
                  visible : true
                }
                
              ]
            },
          },
          yaxis: {
            showgrid: false,
            zeroline: false,
            visible: false,
            showline:true,
            fixedrange:true,
          },
          
        }}
            config={{ displayModeBar: false, scrollZoom: false }}
            />
      </>
      )}
      {stPending && <div>Loading...</div>}
      {sterror && <>{error}</>}
      {stockdetails && 
      <div className="discription">
        {stockdetails.results.description}
      </div>}
    </div>
  );
}
