import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function SearchResults() {
    const queryParameter = useLocation().search
    const queryString = new URLSearchParams(queryParameter)
    const query = queryString.get('q')
    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&apiKey=${process.env.REACT_APP_KEY}`

    const {data, isPending, error} = useFetch(url)
    const navigate = useNavigate()
    const handleClick=(ticker)=>{
        navigate(`/details?q=${ticker}`)
    }
  return (
    <div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading ...</div>}
        {data && 
        <div>
            {data.results.map(result =>(
                <div key={result.ticker} 
                onClick={()=>handleClick(result.ticker)}
                className="card">
                    <h1>{result.name}</h1>
                    <h2>{result.ticker}</h2> 
                    <p>{result.market}</p>   
                    </div>
            ))}
        </div>}

    </div>
  )
}
