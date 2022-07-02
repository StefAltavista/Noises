//get the DOM
import ReactDOM from "react-dom";
//initialize socket.io if logged in
import { init } from "./socketInit.js";

//components
import Welcome from "./welcome.js";
import UpdatePassword from "./components/UpdatePassword.js";
import App from "./App.js";
import { Provider } from "react-redux";
import reducer from "./redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

//create store is deprecated,
// import { configureStore } from "redux";
// const store = configureStore();

(async function () {
    const verification = await fetch("/user/verification");
    const verificationData = await verification.json();
    if (verificationData.verified && verificationData.email) {
        fetch("/user/clearVerification");
        ReactDOM.render(
            <UpdatePassword email={verificationData.email} />,
            document.querySelector("main")
        );
    } else {
        const id = await fetch("/user/id.json");
        const idData = await id.json();
        if (!idData.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            init();
            const app = (
                <Provider store={store}>
                    <App />
                </Provider>
            );

            ReactDOM.render(app, document.querySelector("main"));
        }
    }
})();
