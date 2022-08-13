import { useState } from "react";
import ImgModal from "./ImgModal.js";
import EditBio from "./Editbio.js";

export default function ProfilePage(props) {
    const [imgModal, setImgModal] = useState(false);
    const [bioModal, setBioModal] = useState(false);

    const toggleImgModal = () => {
        setImgModal(!imgModal);
    };

    const updatePicture = (newValues) => {
        toggleImgModal();
        props.update({ imgurl: newValues });
    };
    const toggleBioModal = () => {
        setBioModal(!bioModal);
    };

    const updateBio = (x) => {
        toggleBioModal();
        props.update({ bio: x });
    };

    return (
        <div id="account">
            <div id="profile">
                <img id="avatar" src={props.imgurl} onClick={toggleImgModal} />
                <div id="info">
                    <p>{props.name}</p>
                    <p>{props.surname}</p>
                    <div id="bio">
                        {props.bio ? (
                            <div>
                                <p id="biography">{props.bio}</p>
                                <button onClick={toggleBioModal}>edit</button>
                            </div>
                        ) : (
                            <button onClick={toggleBioModal}>Add bio</button>
                        )}
                    </div>
                </div>
            </div>

            {imgModal && (
                <ImgModal
                    closeModal={toggleImgModal}
                    updatePicture={updatePicture}
                />
            )}
            {bioModal && (
                <EditBio
                    bio={props.bio}
                    closeEdit={toggleBioModal}
                    updateBio={updateBio}
                />
            )}
        </div>
    );
}
