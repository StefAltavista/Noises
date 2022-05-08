import { Component } from "react";
export default class Registration extends Component {
    constructor() {
        super();
        this.state = { error: "" };

        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault();
        console.log("e", e.target[0].value);
        this.setState({
            first: e.target[0].value,
            last: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        });
        console.log("out state:", this.state);

        let reqBody = {
            first: e.target[0].value,
            last: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        };

        fetch("/register", {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(reqBody),
        })
            .then((result) => result.json())
            .then(({ e, id }) => {
                console.log("fetch:", e, id);
                if (e) {
                    console.log("error", e);
                    this.setState({ error: e });
                    console.log("error:", this.state.error);
                } else if (id) {
                    this.init = id;
                    return location.reload();
                }
            });
    }

    render() {
        return (
            <div>
                <div className="welcomebody">
                    <div id="noise">
                        <img src="/logo.png" id="logo" />
                        <h1>N O I S E S</h1>
                    </div>
                    <form className="register" onSubmit={this.register}>
                        <h3>Sign in</h3>
                        <input
                            type="text"
                            name="first"
                            placeholder="name"
                        ></input>
                        <input
                            type="text"
                            name="last"
                            placeholder="surname"
                            required
                        ></input>
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
                            <p className="exists">{this.state.error}</p>
                        )}
                        <button>Register</button>

                        <p className="log">
                            already registered? <a href="/">Log in</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
