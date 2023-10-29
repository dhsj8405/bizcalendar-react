import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';
// 로딩중 ... 
const Spinner = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <BootstrapSpinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </BootstrapSpinner>
        </div>
    );
};

export default Spinner;