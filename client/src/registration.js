import { Component } from "react";
import { Link } from "react-router-dom";
export default class Registration extends Component {
    constructor() {
        super();
        this.state = { error: "" };
        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault();
        this.setState(
            {
                first: e.target[0].value,
                last: e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value,
                imgUrl: "/defaultUserImg.png",
                friends: [],
            },
            () => {
                fetch("/register", {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(this.state),
                }).then((result) => {
                    console.log("result: ", result);
                    result.json().then((res) => {
                        const { e, id } = res;
                        console.log("res: ", res);
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
            <form className="register" onSubmit={this.register}>
                <h3>Sign in</h3>
                <input type="text" name="first" placeholder="name"></input>
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
                    <p className="error">{this.state.error}</p>
                )}
                <button>Register</button>

                <p className="log">
                    already registered? <Link to="/login">Log in</Link>
                </p>
            </form>
        );
    }
}
