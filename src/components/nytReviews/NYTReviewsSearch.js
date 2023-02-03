import { useState } from "react"
import { NYTReviews } from "./NYTReviews"
import Settings from "../../Settings"
import "../styles/NYTReviews.css"

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
        <div className="nytReviews">
            <div className="nytReviews-left">
                <h2>Search NYT Critic Reviews</h2>
                <div>
                    <label htmlFor="nytReviewsSearchBox">Search by any term:</label><br></br>
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
                        className="buttonUserReviewsSearch">
                        Search
                    </button>
                </div>
            </div>
            <div className="nytReviews-right">
                <h2>List of Found NYT Reviews</h2>
                <NYTReviews searchResults={searchResults} />
            </div>
            
        </div>
    )
}