import Registration from "./registration";
import Login from "./login";
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
                </div>
            </BrowserRouter>
        </div>
    );
};
export default Welcome;
