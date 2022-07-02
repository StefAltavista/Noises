import { Component } from "react";
import Navigator from "./components/Navigator.js";
import MyAccount from "./components/MyAccount.js";
import MyFriends from "./components/MyFriends.js";
import OtherAccount from "./components/OtherAccount.js";
import Results from "./components/Results.js";
import NoisesPool from "./components/GroupChat";
import Dashboard from "./components/Dashboard";
import CreateEvent from "./components/CreateEvent.js";
import Event from "./components/Event.js";
import Calendar from "./components/Calendar.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setAccount } from "./redux/setMe/slice.js";

//comment

class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            surname: "",
            bio: "",
            email: "",
            imgurl: "",
        };
        this.update = this.update.bind(this);
        this.searchResults = this.searchResults.bind(this);
    }

    async componentDidMount() {
        const userData = await fetch("/user");
        const user = await userData.json();
        this.setState(user, () => {
            console.log("callback setState:", this.state);
            this.props.setMeUp(this.state);
        });
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
                        <div id="NavBar">
                            <Navigator
                                id={this.state.id}
                                name={this.state.name}
                                surname={this.state.surname}
                                imgurl={this.state.imgurl}
                                update={this.update}
                                searchResults={this.searchResults}
                            ></Navigator>
                        </div>
                        <div id="body">
                            <Switch>
                                {/* route to my profile page */}
                                <Route exact path="/me">
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
                                <Route path="/myMessages">
                                    <NoisesPool />
                                </Route>
                                <Route path="/createEvent">
                                    <CreateEvent />
                                </Route>
                                <Route path="/event/:id">
                                    <Event />
                                </Route>
                                <Route path="/calendar">
                                    <Calendar />
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

                                <Route path="/">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMeUp: (state) => {
            dispatch(setAccount(state));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
