import React from 'react';
import './TimingBar.scss';
interface TimingBarProps {
    value: number
}

const TimingBar: React.FunctionComponent<TimingBarProps> = ({ value }) => {
    let width = (value * 100) + '%';

    return (
        <div className="outerTimingBar">
            <div className="innerTimingBar" style={{ width: width }}></div>
        </div>
    )
}

export default TimingBar;