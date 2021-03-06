import React from 'react';
import '../theme/style.scss';

interface RowProps {
    justify?: string,
    align?: string
}

const Row: React.FC<RowProps> = ({ justify, align, children }) => {

    function touchMove(ev: any){
        if (ev.targetTouches.length === 2 && ev.changedTouches.length === 2) {
            
        }
    }

    return (
        <div className="row" onTouchMove={touchMove}>
            { children }
        </div>
    )
}

export default Row;