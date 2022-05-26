import { socket } from "./socketInit.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoisyPool from "./groupChat";
import RecentUsers from "./recentUsers";
import EventsFeed from "./eventsFeed";

import Me from "./me";

export default function Dashboard() {
    return (
        <div id="dashboard">
            <div>
                <div id="mine">
                    <Me />
                </div>
            </div>
            <div id="newsFeed">
                <EventsFeed />
            </div>
            <div>
                <NoisyPool />
            </div>
        </div>
    );
}
