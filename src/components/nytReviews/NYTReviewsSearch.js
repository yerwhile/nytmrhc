import { useState } from "react"
import { NYTReviews } from "./NYTReviews"
import Settings from "../../Settings"

export const NYTReviewsSearch = () => {

    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearchButtonClick = (e) => {
        e.preventDefault()

        return fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchTerms}&api-key=${Settings.reviewKey}`)
            .then(res => res.json())
            .then((searchData) => {
                setSearchResults(searchData.results)
            })
    }

    return (
        <>
        <div>
            <div>
                <label htmlFor="nytReviewsSearchBox">Search NYT Reviews</label><br></br>
                <input 
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Search All Reviews" id="nytReviewsSearchBox" />
            </div>
            <div>
                <button
                    onClick={(clickEvent) => handleSearchButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Search
                </button>
            </div>
        </div>
        <NYTReviews searchTerms={searchTerms} searchResults={searchResults} />
        </>
    )
}