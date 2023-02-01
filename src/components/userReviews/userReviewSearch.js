import { useEffect, useState } from "react"
import { UserReviewDropdown } from "./UserReviewDropdown"
import { UserReviews } from "./UserReviews"

export const UserReviewSearch = () => {
    

    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [reviews, setReviews] = useState([])
    const [criticChoice, setCriticChoice] = useState("")
    const [uniqueCritics, setUniqueCritics] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8088/reviews`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setReviews(reviewsArr)
            })
    }, [])

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
        <>
        <div>
            <div>
                <label htmlFor="userReviewsSearchBox">Search User Reviews</label><br></br>
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
                    className="btn btn-primary">
                    Search
                </button>
            </div>
        </div>
        <UserReviewDropdown setSearchResults={setSearchResults}
            searchTerms={searchTerms} 
            setSearchTerms={setSearchTerms}
            uniqueCritics={uniqueCritics} 
            criticChoice={criticChoice} 
            setCriticChoice={setCriticChoice}/>
        <UserReviews searchResults={searchResults} />
        </>
    )
}