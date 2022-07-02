import { Link } from "react-router-dom";
export default function Settings({ settingsMenu }) {
    function logout() {
        console.log("logout");
        fetch("/logout").then(() => location.reload());
    }
    return (
        <div id="overlay">
            <div id="settings">
                <p onClick={settingsMenu}>X</p>
                <ul>
                    <li>
                        <Link to="/me">My Account</Link>
                    </li>
                    <li>Settings</li>
                    <li>
                        <a onClick={logout}>Log Out</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
