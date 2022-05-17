import { Link } from "react-router-dom";
export default function SettingsMenu({ settingsMenu }) {
    function logout() {
        console.log("logout");
        fetch("/logout").then(() => location.reload());
    }
    return (
        <div id="settings">
            <p onClick={settingsMenu}>X</p>
            <ul>
                <li>
                    <Link to="/">My Account</Link>
                </li>
                <li>
                    <a onClick={logout}>Log Out</a>
                </li>
            </ul>
        </div>
    );
}
