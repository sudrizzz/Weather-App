import React from 'react';
import "./form.style.css";

const Form = props => {
    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadWeather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2 pt-1">
                        <input
                            type="text"
                            className="from-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City, example: chengdu">
                        </input>
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left p-3">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function error() {
    return (
        <div className="alert alert-danger mx-2" role="alert">
            Please Enter City and Country
        </div>
    );
}

export default Form;