import React from 'react';
import './TimingBar.scss';
interface TimingBarProps {
    value: number,
    level: number
}

const TimingBar: React.FunctionComponent<TimingBarProps> = ({ value, level }) => {
    let width = (value * 100) + '%';

    let levelClass = "levelOne";
    if (level === 2){
        levelClass = 'levelTwo';
    } else if (level === 3){
        levelClass = 'levelThree';
    }

    return (
        <div className="outerTimingBar">
            <div className={`innerTimingBar ${levelClass}`} style={{ width: width }}></div>
        </div>
    )
}

export default TimingBar;