import { Component } from "react";
import SettingsMenu from "./settingsmenu";
import Search from "./search";

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = { imgModal: false, search: false };
        this.settingsMenu = this.settingsMenu.bind(this);
    }
    settingsMenu() {
        this.setState({ settingsMenu: !this.state.settingsMenu });
    }

    render() {
        return (
            <nav>
                <div id="search">
                    <img
                        src="./searchLent.png"
                        onClick={() => {
                            this.setState({ search: !this.state.search });
                        }}
                        id="searchLent"
                    />
                    {this.state.search && <Search myId={this.props.id} />}
                </div>

                <img src="./logo.png" id="logo" />
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
