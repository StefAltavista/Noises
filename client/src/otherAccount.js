import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FriendButton from "./friendButton.js";

export default function OtherAccount() {
    const { otherUserId } = useParams();
    const [otherUser, setOtherUser] = useState({});
    const [nomatch, setNomatch] = useState();
    useEffect(() => {
        fetch("/api/getuser", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ id: otherUserId }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.nomatch) {
                    setNomatch(true);
                } else {
                    console.log("other user:", user);
                    setOtherUser(user);
                }
            })
            .then(() => {
                console.log(otherUser);
            });
        console.log(
            "mounting from use effect, mounting account n. :",
            otherUserId
        );
    }, [otherUserId]);

    return (
        <>
            {" "}
            <div id="account">
                {otherUser.name && (
                    <div id="profile">
                        <div id="profile">
                            <div id="profilepic">
                                <img id="avatar" src={otherUser.imgurl} />
                                <FriendButton
                                    otherUserId={otherUserId}
                                ></FriendButton>
                            </div>

                            <div id="info">
                                <p>{otherUser.name}</p>
                                <p>{otherUser.surname}</p>
                                <p>{otherUser.bio}</p>
                            </div>
                        </div>
                    </div>
                )}
                {nomatch && <p>Nothing to see here!</p>}
            </div>
        </>
    );
}
