/* eslint-disable indent */
import { useEffect, useState } from "react";

export default function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState();

    const updateRelationship = () => {
        //fetch PUT friendship
        let reqBody = {};
        let wait = false;
        switch (buttonText) {
            case "Unfriend":
                console.log("UNFRIEND THIS USER");
                reqBody = { action: "unfriend", otherUserId };
                break;
            case "Accept Friendship":
                console.log("ACCEPT FRIENDSHIP");
                reqBody = { action: "accept", otherUserId };
                break;
            case "Request Sent":
                console.log("REQUEST SENT");
                wait = true;
                break;
            case "Request Friendship":
                console.log("Request Friendship");
                reqBody = { action: "request", otherUserId };
                break;
        }
        if (!wait) {
            fetch("/user/connect", {
                headers: { "content-type": "application/json" },
                method: "PUT",
                body: JSON.stringify(reqBody),
            })
                .then((result) => result.json())
                .then((x) => {
                    console.log(x);
                    setButtonText(x);
                });
        }
    };

    useEffect(() => {
        fetch("/user/friends")
            .then((result) => result.json())
            .then(({ friends }) => {
                //console.log(typeof friends);
                let isFriend = friends.split(",").filter((x) => {
                    x == otherUserId;
                });
                console.log(isFriend[0]);

                if (isFriend[0]) {
                    console.log(isFriend[0]);
                    setButtonText("Unfriend");
                } else {
                    console.log("nofriend");
                    fetch("/pending")
                        .then((result) => result.json())
                        .then(({ rows }) => {
                            if (rows) {
                                console.log("my Pending Requests:", rows);
                                //check wether otheruserid is present in rows
                                const otherUserSender = rows.filter((x) => {
                                    x.sender_id == otherUserId;
                                });
                                if (otherUserSender[0]) {
                                    setButtonText("Accept Friendship");
                                }
                                const otherUserRecipient = rows.filter((x) => {
                                    x.recipient_id == otherUserId;
                                });
                                if (otherUserRecipient[0]) {
                                    setButtonText("Request Sent");
                                }
                            } else {
                                setButtonText("Request Friendship");
                            }
                        });
                }
            });
    }, []);
    return (
        <>
            <button onClick={updateRelationship}>{buttonText}</button>
        </>
    );
}
