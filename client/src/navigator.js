import { Component } from "react";
import SettingsMenu from "./settingsmenu";

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = { imgModal: false };
        this.settingsMenu = this.settingsMenu.bind(this);
    }
    settingsMenu() {
        this.setState({ settingsMenu: !this.state.settingsMenu });
    }

    render() {
        return (
            <nav>
                <div id="logo">
                    <img src="./logo.png" />
                </div>

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
