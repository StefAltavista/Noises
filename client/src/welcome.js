import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { BrowserRouter, Route } from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <BrowserRouter>
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
