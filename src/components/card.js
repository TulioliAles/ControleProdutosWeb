import React from 'react'

export default (props) => (
    <div className="card">
        <div className="header">
            {props.header}
        </div>
        <div className="body">
            {props.children}
        </div>
    </div>
)