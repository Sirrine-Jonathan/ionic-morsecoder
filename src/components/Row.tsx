import React from 'react';

interface RowProps {
    justify?: string
}

const Row: React.FC<RowProps> = ({ justify, children }) => {

    const style = {
        display: 'flex',
        justifyContent: justify
    }

    return (
        <div style={style}>
            { children }
        </div>
    )
}

export default Row;