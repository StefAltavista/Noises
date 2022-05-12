import { Component } from "react";
import Navigator from "./navigator.js";
import MyAccount from "./myAccount.js";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = { name: "", surname: "", bio: "", email: "", imgurl: "" };
        this.update = this.update.bind(this);
    }
    async componentDidMount() {
        const userData = await fetch("/user");
        const user = await userData.json();
        console.log("user:", user[0]);
        this.setState(user[0]);
    }
    update(newValues) {
        console.log("update app with:", newValues);
        this.setState(newValues, () => {
            console.log("New State:", this.state);
        });
    }

    render() {
        return (
            <div>
                <Navigator
                    id={this.state.id}
                    name={this.state.name}
                    surname={this.state.surname}
                    imgurl={this.state.imgurl}
                    update={this.update}
                ></Navigator>
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <MyAccount
                                name={this.state.name}
                                surname={this.state.surname}
                                imgurl={this.state.imgurl}
                                bio={this.state.bio}
                                update={this.update}
                            ></MyAccount>
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
