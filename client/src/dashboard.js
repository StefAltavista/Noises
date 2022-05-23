import { socket } from "./socketInit.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoisyPool from "./groupChat";
import RecentUsers from "./recentUsers";
import Me from "./me";

export default function Dashboard() {
    const dispatch = useDispatch();

    return (
        <div id="dashboard">
            <div>
                <div id="mine">
                    <Me />
                </div>
            </div>
            <div id="newsFeed">
                <RecentUsers />
            </div>
            <div>
                <NoisyPool />
            </div>
        </div>
    );
}
