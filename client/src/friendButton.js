import { useEffect, useState } from "react";

export default function FriendButton(otherUserId) {
    const [buttonText, setButtonText] = useState();

    const updateRelationship = () => {
        //fetch PUT friendship
    };
    // useEffect(() => {
    //     //fetch friendship to check wheter I'm friend with the OtherAccount
    //     fetch("/user/friends")
    //         .then((result) => result.json)
    //         .then((friends) => {
    //             console.log(friends);
    //             let isFriend = friends.filter((x) => {
    //                 x == otherUserId;
    //             });
    //             if (isFriend) {
    //                 setButtonText("Unfriend");
    //             } else {
    //                 fetch("/pending")
    //                     .then((result) => result.json())
    //                     .then((pending) => {
    //                         console.log(pending);
    //                     });
    //             }
    //         });
    // }, []);
    return (
        <>
            <button onClick={updateRelationship}>{buttonText}</button>
        </>
    );
}
