import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
const LandingPage: React.FC = () => {

    return(
        <div style={{textAlign: 'center', marginTop: '50px'}} className="landingDiv">
            <h1>Welcome to the application</h1>
            <div className="btnDiv">
                <Link to='/login' >
                    <button className="btn">
                        Login
                    </button>
                </Link>

                <Link to='/signup'>
                    <button className="btn">
                        Signup
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;