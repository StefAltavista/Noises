import { Component } from "react";
import Navigator from "./navigator.js";
import MyAccount from "./myAccount.js";
import MyFriends from "./myfriends.js";
import OtherAccount from "./otherAccount.js";
import Results from "./results.js";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = { name: "", surname: "", bio: "", email: "", imgurl: "" };
        this.update = this.update.bind(this);
        this.searchResults = this.searchResults.bind(this);
    }

    async componentDidMount() {
        const userData = await fetch("/user");
        const user = await userData.json();
        console.log("Me:", user[0]);
        this.setState(user[0]);
    }
    update(newValues) {
        console.log("update app with:", newValues);
        this.setState(newValues, () => {
            console.log("New State:", this.state);
        });
    }
    searchResults(match) {
        console.log("app-match", match);
        this.setState({ searchResults: match });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navigator
                            id={this.state.id}
                            name={this.state.name}
                            surname={this.state.surname}
                            imgurl={this.state.imgurl}
                            update={this.update}
                            searchResults={this.searchResults}
                        ></Navigator>

                        {/* route to my profile page */}
                        <Route exact path="/">
                            <MyAccount
                                name={this.state.name}
                                surname={this.state.surname}
                                imgurl={this.state.imgurl}
                                bio={this.state.bio}
                                update={this.update}
                            ></MyAccount>
                        </Route>

                        {/* route to other user profile page */}

                        <Route path="/user/:otherUserId">
                            <OtherAccount />
                        </Route>

                        {/* route to search result page */}
                        <Route path="/results">
                            <Results
                                allResults={this.state.searchResults}
                            ></Results>
                        </Route>
                        {/* route to MyFriends and requests */}
                        <Route path="/myfriends">
                            <MyFriends />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
