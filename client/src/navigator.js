import { Component } from "react";
import ImgModal from "./imgModal.js";

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = { imgModal: false };
        this.imgMod = this.imgMod.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
    }
    imgMod() {
        this.setState({ imgModal: !this.state.imgModal });
    }
    updatePicture(img) {
        this.setState({ imgUrl: img });
    }

    render() {
        return (
            <nav>
                <div id="logo">
                    <img src="./logo.png" />
                </div>

                <div id="user">
                    <p>
                        {this.props.name} {this.props.surname}
                    </p>
                    <img
                        src={this.state.imgUrl}
                        onClick={this.imgMod}
                        id="profPic"
                    />
                </div>

                {this.state.imgModal && (
                    <ImgModal
                        closeModal={this.imgMod}
                        updatePicture={this.updatePicture}
                    />
                )}
            </nav>
        );
    }
}
