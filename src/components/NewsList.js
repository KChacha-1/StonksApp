import React from 'react'
import { useFetch } from '../hooks/useFetch'
import "./NewsList.css"

export default function NewsList() {
    const {data, isLoading, error} = useFetch(`https://api.polygon.io/v2/reference/news?apiKey=${process.env.REACT_APP_KEY}`)
    return (
    <div className="stories"> 
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {data &&
        <div>
            {data.results.map(story => (
                <div key={story.id} className="card">
                    <h1>{story.title}</h1>
                    <h2>{story.author}</h2>
                    <h3>{story.ticker}</h3>
                    <p >{story.description}</p>
                    <button onClick={()=>{window.location.href = story.amp_url}}>Read More...</button>
                    
                </div>
            ))}
        </div>}
    </div>
  )
}
