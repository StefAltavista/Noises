import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { getMyRequests } from "./redux/requests/slice.js";

export default function MyRequests() {
    let myId;
    const dispatch = useDispatch();
    const requests = useSelector((state) => {
        return state.requests;
    });
    (async function () {
        const userData = await fetch("/user");
        const user = await userData.json();
        myId = user[0].id;
    })();
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
                            console.log("user", user);
                            dispatch(getMyRequests(user));
                        });
                });
            });
    }, []);

    return (
        <div>
            <p>Pending Requests</p>
            {requests && (
                <ul id="MyFriends">
                    {requests.map((user) => {
                        return (
                            <li id="friend" key={user.id}>
                                <img src={user.imgurl} />
                                <p>
                                    {user.name} {user.surname}
                                </p>
                                <button>Accept</button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
