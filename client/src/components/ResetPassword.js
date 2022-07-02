import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = { submit: true };
        this.getResetLink = this.getResetLink.bind(this);
    }
    getResetLink(e) {
        e.preventDefault();
        this.setState({ email: e.target[0].value }, () =>
            fetch("/api/password", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(this.state),
            }).then((res) =>
                res.json().then((res) => {
                    const { e, success } = res;
                    if (e) {
                        this.setState({ error: e });
                    } else {
                        this.setState({ submit: false, success });
                        console.log(res);
                    }
                })
            )
        );
    }
    render() {
        return (
            <div id="resetComponent">
                {this.state.error && (
                    <p className="error">{this.state.error}</p>
                )}
                {this.state.success && (
                    <p className="success">{this.state.success}</p>
                )}
                {this.state.submit && (
                    <form className="reset" onSubmit={this.getResetLink}>
                        <h3>Reset your password</h3>

                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            required
                        ></input>

                        {this.state.error && (
                            <p className="error">{this.state.error}</p>
                        )}
                        <button>Submit</button>

                        <p className="log">
                            <Link to="/login">Log in</Link>
                        </p>
                    </form>
                )}
            </div>
        );
    }
}
