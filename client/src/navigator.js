import { Component } from "react";
import Settings from "./settings";
import Search from "./search";
import { Link } from "react-router-dom";

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = { imgModal: false, search: false };
        this.notifications = this.notifications.bind(this);
        this.settings = this.settings.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
    }
    notifications() {
        this.setState({ notifications: !this.state.notifications });
    }
    settings() {
        this.setState({ settings: !this.state.settings });
    }
    searchResults(match) {
        console.log("From Navigator, calling SearchResult in parent", match);
        this.props.searchResults(match);
    }
    toggleSearch() {
        this.setState({ search: !this.state.search });
    }

    render() {
        return (
            <nav>
                <Link to="/">
                    <div id="navLeft">
                        <img src="/logo.png" id="logo" />

                        <strong>N O I S E S</strong>
                    </div>
                </Link>

                <div id="commands">
                    <div id="search">
                        {this.state.search && (
                            <Search
                                myId={this.props.id}
                                searchResults={this.searchResults}
                                toggleSearch={this.toggleSearch}
                            />
                        )}
                        <img
                            src="/searchLent.png"
                            onClick={this.toggleSearch}
                            id="searchLent"
                        />
                    </div>
                    <Link to="/createEvent">
                        <p id="createEventButton">Create Event</p>
                    </Link>
                    <Link to="/myMessages">
                        <img src="/messagesIcon.png" id="messagesIcon" />
                    </Link>
                    <img
                        src="/notificationsIcon.png"
                        onClick={this.notifications}
                        id="notificationsIcon"
                    />
                    <img
                        src="/menuIcon.png"
                        onClick={this.settings}
                        id="menuIcon"
                    />
                </div>

                {this.state.settings && <Settings settings={this.settings} />}
            </nav>
        );
    }
}
