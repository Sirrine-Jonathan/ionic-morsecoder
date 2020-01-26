import React from "react";
import Challenge from "./Challenge";

interface ChallengesProps {
    challenges: string[][]
}
  
const Challenges: React.FC<ChallengesProps> = ({ challenges }) => {
    let items = challenges.map((each, index) => {
        return <Challenge key={index} drills={each} />
    })
    return (
        <div className="challengeList">
            {items}
        </div>
    )
};

export default Challenges;