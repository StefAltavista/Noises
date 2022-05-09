import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = { error: "" };
        this.login = this.login.bind(this);
    }
    //methods
    login(e) {
        e.preventDefault();
        this.setState(
            {
                email: e.target[0].value,
                password: e.target[1].value,
            },
            () => {
                fetch("/login", {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(this.state),
                }).then((result) => {
                    result.json().then(({ e, id }) => {
                        console.log(e, id);
                        if (e) {
                            this.setState({ error: e });
                        } else if (id) {
                            this.init = id;
                            return location.reload();
                        }
                    });
                });
            }
        );
    }
    render() {
        return (
            <div>
                <div className="welcomebody">
                    <div id="noise">
                        <img src="/logo.png" id="logo" />
                        <h1>N O I S E S</h1>
                    </div>
                    <form className="register" onSubmit={this.login}>
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
                        {this.state.error && (
                            <p className="error">{this.state.error}</p>
                        )}
                        <button>Enter</button>

                        <p className="register">
                            Dont have an account <Link to="/">Sign in</Link>
                        </p>
                        <p className="reset">
                            Forgot your password?
                            <Link to="/resetpassword">Click here</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
