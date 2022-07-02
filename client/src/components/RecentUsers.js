import { socket } from "../socketInit.js";
import { useEffect, useState } from "react";
export default function RecentUsers() {
    const [lastUsers, setLastUsers] = useState([]);
    useEffect(() => {
        socket.emit("GET_LAST_USERS");
        socket.on("LAST_USERS", (rows) => {
            setLastUsers([...rows]);
        });
    }, []);

    return (
        <ul id="RecentUsers">
            <h3>New on Noises</h3>
            {lastUsers &&
                lastUsers.map((user, idx) => (
                    <li key={idx} id="each">
                        <img src={user.imgurl} id="lastUserImg" />
                        <p>
                            {user.name} {user.surname[0]}
                        </p>
                    </li>
                ))}
        </ul>
    );
}
