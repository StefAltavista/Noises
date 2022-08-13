import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Login() {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [success, setSuccess] = useState(false);

    const login = (e) => {
        e.preventDefault();
        setEmail(e.target[0].value);
        setPassword(e.target[1].value);
        setSubmit(true);
    };

    useEffect(() => {
        if (submit) {
            fetch("/login", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password }),
            }).then((result) => {
                result.json().then(({ e, id }) => {
                    if (e) {
                        setError(e);
                        setSubmit(false);
                    } else if (id) {
                        return location.replace("/");
                    }
                });
            });
        }
    }, [submit]);

    return (
        <div>
            <div className="welcomebody">
                <form className="register" onSubmit={login}>
                    <h3>Log in</h3>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        required
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                    ></input>
                    {error && <p className="error">{error}</p>}

                    <button>Enter</button>

                    <p id="singResetLinks">
                        Dont have an account <Link to="/">Sign in</Link>
                        <br></br>
                        <br></br>Forgot your password?
                        <Link to="/resetpassword">Click here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
