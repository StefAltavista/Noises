import { Component } from "react";
export default class Registration extends Component {
    constructor() {
        super();
        this.state = { first: "", last: "", email: "", password: "" };
        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault();
        let reqBody;
        this.setState({
            first: e.target[0].value,
            last: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        });
        reqBody = JSON.stringify({
            first: e.target[0].value,
            last: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        });
        console.log("Prepare request body:", reqBody);

        fetch("/register", {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: reqBody,
        })
            .then

            ///////////////fetch new page//////redirect/////
            ();
    }

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form onSubmit={this.register}>
                    <input type="text" name="first" placeholder="name"></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="surname"
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    ></input>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}
