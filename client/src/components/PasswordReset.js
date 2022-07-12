import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PasswordReset() {
    const [submit, setSubmit] = useState(true);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    const sendResetLink = (e) => {
        e.preventDefault();
        setEmail(e.target[0].value);
    };
    useEffect(() => {
        if (email) {
            fetch("/api/password", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email: email }),
            }).then((response) =>
                response.json().then((res) => {
                    const { e, success } = res;
                    e ? setError(e) : setSubmit(false) && setDone(success);
                })
            );
        }
    }, [email]);

    return (
        <div id="resetComponent">
            {error && <p className="error">{error}</p>}
            {done && <p className="success">{done}</p>}
            {submit && (
                <form className="reset" onSubmit={sendResetLink}>
                    <h3>Reset your password</h3>

                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        required
                    ></input>

                    <button>Submit</button>

                    <p className="log">
                        <Link to="/login">Log in</Link>
                    </p>
                </form>
            )}
        </div>
    );
}
