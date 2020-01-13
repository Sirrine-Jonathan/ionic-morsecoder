import React from 'react';

interface TimingBarProps {
    value: number
}

const TimingBar: React.FunctionComponent<TimingBarProps> = ({ value }) => {
    let width = (value * 100) + '%';
    let outerStyle = {
        height: '20px',
        margin: '1%',
        width: '98%',
        backgroundColor: '#bbbbbb',
        boxSizing: 'borderBox' as 'border-box',
        borderRadius: '10px'
    }
    let barStyle = {
        width: width,
        maxWidth: '100%',
        height: '100%',
        backgroundColor: '#000000',
        borderRadius: '10px',
        color: 'white'
        
    }
    return (
        <div style={outerStyle}>
            <div style={barStyle}></div>
        </div>
    )
}

export default TimingBar;