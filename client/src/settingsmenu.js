export default function SettingsMenu({ settingsMenu }) {
    return (
        <div>
            <p onClick={settingsMenu}>X</p>
            <ul>
                <li>Account</li>
                <li>Log Out</li>
            </ul>
        </div>
    );
}
