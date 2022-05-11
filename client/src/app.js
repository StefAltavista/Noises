import { Component } from "react";
import Navigator from "./navigator.js";
import Mainbody from "./me.js";
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
        console.log(user[0]);
        this.setState(user[0]);
    }
    update(newValues) {
        console.log("update app:", newValues);
        console.log(this.state);
        this.setState({ imgurl: newValues.imgurl });
    }

    render() {
        return (
            <div>
                <Navigator
                    name={this.state.name}
                    surname={this.state.surname}
                    imgurl={this.state.imgurl}
                    update={this.update}
                ></Navigator>
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Mainbody
                                name={this.state.name}
                                surname={this.state.surname}
                                imgurl={this.state.imgurl}
                                update={this.update}
                            ></Mainbody>
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
