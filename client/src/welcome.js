import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Log_In";
import PasswordReset from "./components/PasswordReset";

const Welcome = () => {
    return (
        <div className="welcomebody">
            <BrowserRouter>
                <Link to={"/"}>
                    <div>
                        <div id="noise">
                            <img src="/logo.png" id="mainlogo" />
                            <h1>N O I S E S</h1>
                        </div>
                    </div>
                </Link>
                <Routes>
                    <Route path="/" element={<Registration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route
                        path="/resetpassword"
                        element={<PasswordReset />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default Welcome;
