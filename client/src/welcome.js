import Registration from "./components/Registration";
import Login from "./components/LogIn";
import ResetPassword from "./components/ResetPassword";
import { BrowserRouter, Route, Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="welcomebody">
            <BrowserRouter>
                <div>
                    <Link to={"/"}>
                        <div>
                            <div id="noise">
                                <img src="/logo.png" id="mainlogo" />
                                <h1>N O I S E S</h1>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/resetpassword">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
};
export default Welcome;
