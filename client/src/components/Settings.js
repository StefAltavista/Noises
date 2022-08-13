import { Link } from "react-router-dom";
export default function Settings({ toggle }) {
    function logout() {
        fetch("/logout").then(() => location.reload());
    }
    return (
        <div id="overlay" onClick={toggle}>
            <div id="settings">
                <p onClick={toggle}>X</p>
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
