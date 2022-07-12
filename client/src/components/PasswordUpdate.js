import { useState } from "react";

export default function PasswordUpdate(props) {
    const [toUpdate, setToUpdate] = useState(true);
    const [match, setMatch] = useState(false);
    const [error, setError] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        if (e.target[0].value == e.target[1].value) {
            let reqBody = {
                email: props.email,
                newpassword: e.target[0].value,
            };
            fetch("/api/password", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(reqBody),
            });
            setMatch(true);
            setToUpdate(false);
        } else {
            setError("passwords do not match");
        }
    };

    return (
        <div>
            <div className="welcomebody">
                <div id="noise">
                    <img src="/logo.png" id="logo" />
                    <h1>N O I S E S</h1>
                </div>
                {toUpdate && (
                    <form className="newPassword" onSubmit={resetPassword}>
                        <h3>Create new password</h3>
                        <input
                            type="password"
                            name="password1"
                            placeholder="password"
                            required
                        ></input>
                        <input
                            type="password"
                            name="password2"
                            placeholder="repeat password"
                            required
                        ></input>
                        {error && <p className="error">{error}</p>}
                        <button>Submit</button>
                    </form>
                )}
                {match && (
                    <div id="passwordUpdated">
                        <p>password succesfully updated!</p>
                        <a href="/">Go to Log in</a>
                    </div>
                )}
            </div>
        </div>
    );
}
