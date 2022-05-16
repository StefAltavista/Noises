import { Component } from "react";
import SettingsMenu from "./settingsmenu";
import Search from "./search";

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = { imgModal: false, search: false };
        this.settingsMenu = this.settingsMenu.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
    }
    settingsMenu() {
        this.setState({ settingsMenu: !this.state.settingsMenu });
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
                <div id="search">
                    <img
                        src="/searchLent.png"
                        onClick={this.toggleSearch}
                        id="searchLent"
                    />
                    {this.state.search && (
                        <Search
                            myId={this.props.id}
                            searchResults={this.searchResults}
                            toggleSearch={this.toggleSearch}
                        />
                    )}
                </div>

                <img src="/logo.png" id="logo" />
                <div id="user">
                    <p>
                        {this.props.name} {this.props.surname[0]}.
                    </p>
                    <img
                        src={this.props.imgurl}
                        onClick={this.settingsMenu}
                        id="profPic"
                    />
                </div>

                {this.state.settingsMenu && (
                    <SettingsMenu settingsMenu={this.settingsMenu} />
                )}
            </nav>
        );
    }
}
