import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/LogIn";
import ResetPassword from "./components/ResetPassword";

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
                        element={<ResetPassword />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default Welcome;
