import { useEffect, useState } from "react"
import { UserReviewDropdown } from "./UserReviewDropdown"
import { UserReviews } from "./UserReviews"
import "../styles/UserReviews.css"

export const UserReviewSearch = () => {
    

    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [reviews, setReviews] = useState([])
    const [criticChoice, setCriticChoice] = useState("")
    const [uniqueCritics, setUniqueCritics] = useState([])
    const [honoredReviews, setHonoredReviews] = useState([])

    
    const getAllReviews = () => {
        return fetch(`http://localhost:8088/reviews`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setReviews(reviewsArr)
            })
    }

    const getAllHonoredReviews = () => {
        return fetch(`http://localhost:8088/honoredReviews`)
        .then(res => res.json())
        .then((honoredArr) => {
            setHonoredReviews(honoredArr)
        })
    }

    useEffect(() => {
        getAllReviews()
    }, [])

    useEffect(() => {
        getAllHonoredReviews()
    }, [reviews])

    useEffect(() => {
        const allCritics = reviews.map((review) => {
            return review.nytReviewer
        })
        const allUniqueCritics = [...new Set(allCritics)]
        setUniqueCritics(allUniqueCritics)
    }, [reviews])
    
    useEffect(() => {
        const criticName = uniqueCritics[criticChoice - 1]
        fetch(`http://localhost:8088/reviews?q=${criticName}&_expand=user`)
            .then(res => res.json())
            .then((searchArr) => {
                setSearchResults(searchArr)
            })
        
    }, [criticChoice])
    

    const handleSearchButtonClick = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/reviews?q=${searchTerms}&_expand=user`)
            .then(res => res.json())
            .then((searchArr) => {
                setSearchResults(searchArr)
            })
    }

    return (
        <div className="userReviews">
            <div className="userReviews-left">
                <h2>Search Through User Reviews</h2>
                <div>
                    <label htmlFor="userReviewsSearchBox">Search by any term:</label><br></br>
                    <input 
                        onChange={
                            (changeEvent) => {
                                setSearchTerms(changeEvent.target.value)
                            }
                        }
                        type="text" placeholder="Search All Reviews" id="userReviewsSearchBox" />
                </div>
                <div>
                    <button
                        onClick={(clickEvent) => handleSearchButtonClick(clickEvent)}
                        id="userReviewsSearchButton">
                        Search
                    </button>
                </div>
                <UserReviewDropdown setSearchResults={setSearchResults}
                    searchTerms={searchTerms} 
                    setSearchTerms={setSearchTerms}
                    uniqueCritics={uniqueCritics} 
                    criticChoice={criticChoice} 
                    setCriticChoice={setCriticChoice}/>
            </div>
            <div className="userReviews-right">
                <h2>List of Found Reviews</h2>
                <UserReviews honoredReviews={honoredReviews} getAllReviews={getAllReviews} searchResults={searchResults} />
            </div>
        </div>
    )
}