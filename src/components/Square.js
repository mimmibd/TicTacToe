import React from 'react';
import '../styles/square.css'

function Square ({value, onClick}) {

    return (
        <div>
            <button className="square" onClick = {onClick}>
                {value}
            </button>
        </div>
    )
}

export default Square;