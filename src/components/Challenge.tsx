import React from "react";
import DrillCard from "./DrillCard";

interface ListCardsProps {
    drills: string[],
}

const Challenge: React.FC<ListCardsProps> = ({ drills }) => {
    let items = drills.map((each, index) => {
        return (<DrillCard title={each} key={index}/>);
    });
    items = items;
    return (
        <div className="drillList" >
            {items}
        </div>
    );
};

export default Challenge;