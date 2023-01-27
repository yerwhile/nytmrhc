import { useState, useEffect } from "react"
import Settings from "../Settings"
import { TestItem } from "./TestItem"

export const Test = () => {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=${Settings.reviewKey}`)
            .then(res => res.json())
            .then((searchData) => {
                setSearchResults(searchData.results)
            })
    }, [])

    return <>
    
    <h2>List of Reviews</h2>


    <ul className="plants">
        {
            searchResults.map(
                (review) => <TestItem key={`review--${review.date_updated}`} review={review} />
            )
        }
    </ul>

    </>
}