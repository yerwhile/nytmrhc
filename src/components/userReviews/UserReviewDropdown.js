import { useEffect, useState } from "react"

export const UserReviewDropdown = ({setSearchTerms, setSearchResults, searchTerms, uniqueCritics, criticChoice, setCriticChoice}) => {
    
    
    
    return <div>
                <label htmlFor="userReviewerDropdown">Search by NYT Critics</label>
                <select name="nytReviewers"
                    className="select-box"
                    value={criticChoice}
                    id="critic-select"
                    onChange={(event) => {
                        setCriticChoice(parseInt(event.target.value))
                    }}
                    >
                    <option value="0">Choose a NYT Critic</option>
                    {
                        uniqueCritics.map((critic, index) => {
                            return <option key={index+1} value={index+1} name={critic}>{critic}</option>
                        })
                    }   
                </select>
            </div>
}