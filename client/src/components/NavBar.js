import { useState } from "react";

import Settings from "./Settings";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function NavBar(props) {
    const [search, setSearch] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [settings, setSettings] = useState(false);

    const toggleNotification = () => {
        setNotifications(!notifications);
    };
    const toggleSettings = () => {
        setSettings(!settings);
    };
    const toggleSearch = () => {
        setSearch(!search);
    };
    const searchResults = (match) => {
        props.searchResults(match);
    };

    return (
        <nav>
            <div id="navLeft">
                <img src="/logo.png" id="logo" />
                <strong id="nav_title">
                    <p>N O I S E S </p>
                </strong>
                <Link to="/" className="navLinks">
                    <p>Dashboard</p>
                </Link>

                <Link to="/calendar" className="navLinks">
                    <p>Calendar</p>
                </Link>
            </div>

            <div id="commands">
                <div id="search">
                    {search && (
                        <Search
                            myId={props.id}
                            searchResults={searchResults}
                            toggleSearch={toggleSearch}
                        />
                    )}
                    <img
                        src="/searchLent.png"
                        onClick={toggleSearch}
                        id="searchLent"
                    />
                </div>
                <Link to="/createEvent">
                    <p id="createEventButton">Create Event</p>
                </Link>
                <Link to="/myMessages">
                    <img src="/messagesIcon.png" id="messagesIcon" />
                </Link>
                <img
                    src="/notificationsIcon.png"
                    onClick={toggleNotification}
                    id="notificationsIcon"
                />
                <img
                    src="/menuIcon.png"
                    onClick={toggleSettings}
                    id="menuIcon"
                />
            </div>

            {settings && <Settings toggle={toggleSettings} />}
        </nav>
    );
}
