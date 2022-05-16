import { Link } from "react-router-dom";
export default function SettingsMenu({ settingsMenu }) {
    return (
        <div>
            <p onClick={settingsMenu}>X</p>
            <ul>
                <li>
                    <Link to="/">My Account</Link>
                </li>
                <li>Log Out</li>
            </ul>
        </div>
    );
}
