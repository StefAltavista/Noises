import { Component } from "react";
import Navigator from "./navigator.js";
import Mainbody from "./mainbody.js";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    async componentDidMount() {
        const userData = await fetch("/user");
        const user = await userData.json();
        this.setState(user[0]);
        console.log(user[0]);
    }

    render() {
        return (
            <div>
                <Navigator
                    name={this.state.name}
                    surname={this.state.surname}
                    avatar={this.state.imgUrl}
                ></Navigator>
                <Mainbody></Mainbody>
            </div>
        );
    }
}
