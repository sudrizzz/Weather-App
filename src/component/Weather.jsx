import React from 'react';
import "./weather.style.css";

const Weather = props => {
    return (
        <div className="container text-light">
            <div className="cards">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`} />
                </h5>
                {props.celsius ? <h1 className="py-2">{props.celsius}&deg;</h1> : null}
                <h4 className="py-2">{props.description}</h4>
                {minMaxTemp(props.temp_min, props.temp_max)}
            </div>
        </div>
    );
};

function minMaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className="px-4">low: {min}&deg;</span>
                <span className="px-4">high: {max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;