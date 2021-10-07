'use strict';

import React from 'react';
import { Route } from 'react-router-dom';

//import './style.css';

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <div className="content">
                    <Component {...matchProps} />
                </div>
            </div>
        )} />
    )
}

export default DefaultLayout;