import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import Action Creator
import { getMyFriends, unfriend } from "./redux/friends/slice.js";
//import component MyRequests
import MyRequests from "./myrequests.js";

export default function MyFriends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        return state.friends;
    });

    function remove(id) {
        fetch("/user/connect", {
            headers: { "content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify({ action: "unfriend", otherUserId: id }),
        }).then(() => dispatch(unfriend(id)));
    }

    useEffect(() => {
        fetch("/user/friends")
            .then((res) => res.json())
            .then((friends_ids) => {
                const friendDataPromise = friends_ids.map((id) => {
                    return fetch("/api/getuser", {
                        headers: { "content-type": "application/json" },
                        method: "POST",
                        body: JSON.stringify({ id }),
                    }).then((res) => res.json());
                });
                return friendDataPromise;
            })
            .then((promises) => {
                Promise.all(promises).then((friendsData) => {
                    console.log("friendsData", friendsData);
                    dispatch(getMyFriends(friendsData));
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
                            <li key={friend.id}>
                                <div id="friend">
                                    <Link to={`/user/${friend.id}`}>
                                        <img src={friend.imgurl} />{" "}
                                    </Link>
                                    <p>
                                        {friend.name} {friend.surname}
                                    </p>
                                    <button onClick={() => remove(friend.id)}>
                                        Remove
                                    </button>
                                </div>
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
