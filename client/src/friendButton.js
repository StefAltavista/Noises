/* eslint-disable indent */
import { useEffect, useState } from "react";

export default function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState();

    // useEffect(() => {
    //     fetch("/user/friends")
    //         .then((res) => res.json())
    //         .then((myFriends) => console.log("My friends:", myFriends));
    // });
    useEffect(() => {
        (async function () {
            let result = await fetch("/user/friends");
            let friends = await result.json();
            console.log("My friends:", friends);

            let isFriend = friends.find((x) => x == +otherUserId);
            console.log("search friend:", isFriend);

            if (isFriend) {
                console.log(isFriend, " is my friend!");
                setButtonText("Unfriend");
            } else {
                console.log(otherUserId, " is not my friend yet");
                let results = await fetch("/pending");
                let myPending = await results.json();
                console.log("my pending requests:", myPending);
                if (myPending[0]) {
                    console.log("my Pending Requests:", myPending);
                    const otherUserSender = myPending.filter(
                        (x) => x.sender_id == +otherUserId
                    );
                    const otherUserRecipient = myPending.filter(
                        (x) => x.recipient_id == +otherUserId
                    );
                    if (otherUserSender[0]) {
                        console.log(otherUserId, "sent me a request");
                        setButtonText("Accept Friendship");
                    } else if (otherUserRecipient[0]) {
                        console.log(otherUserId, "received my request");
                        setButtonText("Request Sent");
                    } else {
                        setButtonText("Request Friendship");
                    }
                } else {
                    setButtonText("Request Friendship");
                }
            }
        })();

        // fetch("/user/friends")
        //     .then((result) => result.json())
        //     .then((friends) => {
        //         console.log("My friends:", friends);

        //         let isFriend = friends.find((x) => x == +otherUserId);
        //         console.log(isFriend);

        //         if (isFriend) {
        //             console.log(isFriend, " is my friend!");
        //             setButtonText("Unfriend");
        //         } else {
        //             console.log(otherUserId, " is not my friend yet");
        //             fetch("/pending")
        //                 .then((result) => result.json())
        //                 .then((myPending) => {
        //                     console.log("my pending requests:", myPending);
        //                     if (myPending[0]) {
        //                         console.log("my Pending Requests:", myPending);
        //                         //check wether otheruserid is present in rows
        //                         const otherUserSender = myPending.filter(
        //                             (x) => x.sender_id == +otherUserId
        //                         );
        //                         const otherUserRecipient = myPending.filter(
        //                             (x) => x.recipient_id == +otherUserId
        //                         );
        //                         if (otherUserSender[0]) {
        //                             console.log(
        //                                 otherUserId,
        //                                 "sent me a request"
        //                             );
        //                             setButtonText("Accept Friendship");
        //                         } else if (otherUserRecipient[0]) {
        //                             console.log(
        //                                 otherUserId,
        //                                 "received my request"
        //                             );
        //                             setButtonText("Request Sent");
        //                         } else {
        //                             setButtonText("Request Friendship");
        //                         }
        //                     } else {
        //                         setButtonText("Request Friendship");
        //                     }
        //                 });
        //         }
        //     });
    }, [otherUserId]);

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

    return (
        <>
            <button onClick={updateRelationship}>{buttonText}</button>
        </>
    );
}
