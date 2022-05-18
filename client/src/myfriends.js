import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
//import Action Creator
import { getMyFriends } from "./redux/friends/slice.js";
//import component MyRequests
import MyRequests from "./myrequests.js";

export default function MyFriends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        return state.friends;
    });

    useEffect(() => {
        fetch("/user/friends")
            .then((res) => res.json())
            .then((friends) => {
                friends.map((id) => {
                    fetch("/api/getuser", {
                        headers: { "content-type": "application/json" },
                        method: "POST",
                        body: JSON.stringify({ id }),
                    })
                        .then((res) => res.json())
                        .then((friend) => {
                            if (friend.nomatch) {
                                return;
                            }
                            dispatch(getMyFriends(friend));
                        });
                });
            });
    }, []);

    return (
        <div id="myfriendsPage">
            <p>Friends</p>
            {friends && (
                <ul id="MyFriends">
                    {friends.map((friend) => {
                        return (
                            <li id="friend" key={friend.id}>
                                <img src={friend.imgurl} />
                                <p>
                                    {friend.name} {friend.surname}
                                </p>
                                <button>Remove</button>
                            </li>
                        );
                    })}
                </ul>
            )}
            <div id="requests">
                <MyRequests />
            </div>
        </div>
    );
}
