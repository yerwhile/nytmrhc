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
                <h3>Search <i>NYT</i> Critic Reviews</h3>
                <p>Find a NYT Review, and review the reviewer!</p>
                <div>
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
                <h3>List of Found <i>NYT</i> Reviews</h3>
                <NYTReviews searchResults={searchResults} />
            </div>
            
        </div>
    )
}