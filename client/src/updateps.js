import { Component } from "react";

export default class UpdatePs extends Component {
    constructor() {
        super();
        this.state = { update: true };
        this.resetPassword = this.resetPassword.bind(this);
    }
    resetPassword(e) {
        e.preventDefault();
        if (e.target[0].value == e.target[1].value) {
            console.log(this.props.email);
            let reqBody = {
                email: this.props.email,
                newpassword: e.target[0].value,
            };
            fetch("/api/password", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(reqBody),
            });
            this.setState({ match: true, update: false });
        } else {
            this.setState({ error: "password does not match" });
        }
    }
    render() {
        return (
            <div>
                <div className="welcomebody">
                    <div id="noise">
                        <img src="/logo.png" id="logo" />
                        <h1>N O I S E S</h1>
                    </div>
                    {this.state.update && (
                        <form
                            className="newPassword"
                            onSubmit={this.resetPassword}
                        >
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
                            {this.state.error && (
                                <p className="error">{this.state.error}</p>
                            )}
                            <button>Submit</button>
                        </form>
                    )}
                    {this.state.match && (
                        <div id="passwordUpdated">
                            <p>password succesfully updated</p>
                            <a href="/">Log in</a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
