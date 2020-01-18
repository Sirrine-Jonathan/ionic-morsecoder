import React from 'react';
import '../theme/style.scss';

interface RowProps {
    justify?: string,
    align?: string
}

const Row: React.FC<RowProps> = ({ justify, align, children }) => {

    return (
        <div className="row">
            { children }
        </div>
    )
}

export default Row;