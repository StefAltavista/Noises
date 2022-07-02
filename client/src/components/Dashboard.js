import NoisyPool from "./GroupChat";
import EventsFeed from "./EventsFeed";

import MeDashSide from "./MeDashSide";

export default function Dashboard() {
    return (
        <div id="dashboard">
            <div>
                <div id="mine">
                    <MeDashSide />
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
