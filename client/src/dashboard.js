import NoisyPool from "./groupChat";
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
