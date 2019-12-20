import React from 'react';

interface RowProps {
    justify?: string,
    align?: string
}

const Row: React.FC<RowProps> = ({ justify, align, children }) => {

    const style = {
        display: 'flex',
        justifyContent: justify,
        alignItems: align
    }

    return (
        <div style={style}>
            { children }
        </div>
    )
}

export default Row;