import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import {
    getMyRequests,
    acceptRequest,
    rejectRequest,
} from "./redux/requests/slice.js";
import { acceptFriend } from "./redux/friends/slice.js";

export default function MyRequests() {
    let myId;

    const dispatch = useDispatch();
    const requests = useSelector((state) => {
        return state.requests;
    });
    (async function () {
        const userData = await fetch("/user");
        const user = await userData.json();
        myId = user.id;
    })();

    function accept(id) {
        dispatch(acceptRequest(id));

        //fetch add friend
        fetch("/user/connect", {
            headers: { "content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify({ action: "accept", otherUserId: id }),
        })
            .then((user) => user.json())
            .then((friend) => {
                console.log("fetch connect:", friend);
            });
        fetch("/api/getuser", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ id }),
        })
            .then((user) => user.json())
            .then((newfriend) => {
                console.log("New friend: ", newfriend);
                dispatch(acceptFriend(newfriend));
            });
    }

    function reject(id) {
        dispatch(rejectRequest(id));
        fetch("/pending", {
            headers: { "content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
    }

    useEffect(() => {
        fetch("/pending")
            .then((res) => res.json())
            .then((requests) => {
                requests.map((request) => {
                    if (request.recipient_id != myId) {
                        return;
                    }
                    fetch("/api/getuser", {
                        headers: { "content-type": "application/json" },
                        method: "POST",
                        body: JSON.stringify({ id: request.sender_id }),
                    })
                        .then((res) => res.json())
                        .then((user) => {
                            if (user.nomatch) {
                                return;
                            }

                            dispatch(getMyRequests(user));
                        });
                });
            });
    }, []);

    return (
        <div id="peopleList">
            {!requests && <p>No pending Requests</p>}
            {requests && (
                <>
                    <p>Pending Requests</p>
                    <ul id="MyFriends">
                        {requests.map((user) => {
                            return (
                                <li key={user.id}>
                                    <div id="friend">
                                        <Link to={`/user/${user.id}`}>
                                            <img src={user.imgurl} />
                                            <p>
                                                {user.name} {user.surname}
                                            </p>
                                            <button
                                                onClick={() => accept(user.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => reject(user.id)}
                                            >
                                                Reject
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}
