import { Component } from "react";
import ImgModal from "./imgModal.js";
import EditBio from "./editbio.js";

export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { editbio: false };
        this.imgMod = this.imgMod.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.editbiography = this.editbiography.bind(this);
        this.toggleditbio = this.toggleditbio.bind(this);
    }

    imgMod() {
        this.setState({ imgModal: !this.state.imgModal });
    }
    updatePicture(newValues) {
        this.imgMod();
        this.props.update({ imgurl: newValues });
    }
    toggleditbio() {
        this.setState({ editbio: !this.state.editbio });
    }
    editbiography(updated) {
        this.toggleditbio();
        this.props.update({ bio: updated });
    }

    render() {
        return (
            <div id="account">
                <div id="profile">
                    <img
                        id="avatar"
                        src={this.props.imgurl}
                        onClick={this.imgMod}
                    />
                    <div id="info">
                        <p>{this.props.name}</p>
                        <p>{this.props.surname}</p>
                        <div id="bio">
                            {this.props.bio ? (
                                <div>
                                    <p id="biography">{this.props.bio}</p>
                                    <button onClick={this.toggleditbio}>
                                        edit
                                    </button>
                                </div>
                            ) : (
                                <button onClick={this.toggleditbio}>
                                    add bio
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {this.state.imgModal && (
                    <ImgModal
                        closeModal={this.imgMod}
                        updatePicture={this.updatePicture}
                    />
                )}
                {this.state.editbio && (
                    <EditBio
                        bio={this.state.bio}
                        closeEdit={this.toggleditbio}
                        updateBio={this.editbiography}
                    />
                )}
            </div>
        );
    }
}
