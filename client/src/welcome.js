import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { BrowserRouter, Route, Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Link to={"/"}>
                        <div className="welcomebody">
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
