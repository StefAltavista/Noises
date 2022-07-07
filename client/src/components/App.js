import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Navigator from "./Navigator.js";
import MyAccount from "./MyAccount.js";
import MyFriends from "./MyFriends.js";
import OtherAccount from "./OtherAccount.js";
import Results from "./Results.js";
import NoisyPool from "./GroupChat";
import Dashboard from "./Dashboard";
import CreateEvent from "./CreateEvent.js";
import Event from "./Event.js";
import Calendar from "./Calendar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setAccount } from "../redux/setMe/slice.js";

export default function App() {
    let user = {};
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            const userData = await fetch("/user");
            user = await userData.json();
            console.log(user);
            dispatch(setAccount(user));
        })();
    }, []);

    const update = (newValues) => {
        console.log("update app with:", newValues);
        dispatch(setAccount(newValues));
    };

    const searchResults = (match) => {
        setResults(match);
    };

    return (
        <>
            <BrowserRouter>
                <div>
                    <div id="NavBar">
                        <Navigator
                            id={user.id}
                            name={user.name}
                            surname={user.surname}
                            imgurl={user.imgurl}
                            update={update}
                            searchResults={searchResults}
                        ></Navigator>
                    </div>
                    <div id="body">
                        <Routes>
                            {/* route to my profile page */}
                            <Route
                                exact
                                path="/me"
                                element={
                                    <MyAccount
                                        name={user.name}
                                        surname={user.surname}
                                        imgurl={user.imgurl}
                                        bio={user.bio}
                                        update={update}
                                    />
                                }
                            ></Route>

                            {/* route to other user profile page */}

                            <Route
                                path="/user/:otherUserId"
                                element={<OtherAccount />}
                            ></Route>
                            <Route
                                path="/myMessages"
                                element={<NoisyPool />}
                            ></Route>
                            <Route
                                path="/createEvent"
                                element={<CreateEvent />}
                            ></Route>
                            <Route
                                path="/event/:id"
                                element={<Event />}
                            ></Route>
                            <Route
                                path="/calendar"
                                element={<Calendar />}
                            ></Route>

                            {/* route to search result page */}
                            <Route
                                path="/results"
                                element={<Results allResults={results} />}
                            ></Route>
                            {/* route to MyFriends and requests */}
                            <Route
                                path="/myfriends"
                                element={<MyFriends />}
                            ></Route>

                            <Route path="/" element={<Dashboard />}></Route>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </>
    );
}
