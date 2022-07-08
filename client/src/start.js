//get the DOM

import * as ReactDOMClient from "react-dom/client"; //initialize socket.io if logged in
import { init } from "./socketInit.js";

//components
import Welcome from "./welcome.js";
import PasswordUpdate from "./components/PasswordUpdate";
import App from "./components/App";

//import App from "./App.js";

import { Provider } from "react-redux";
import reducer from "./redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as immutableState from "redux-immutable-state-invariant";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const container = document.querySelector("main");
const root = ReactDOMClient.createRoot(container);
//comment to push first commit

//create store is deprecated,
// import { configureStore } from "redux";
// const store = configureStore();

(async function () {
    const verification = await fetch("/user/verification");
    const verificationData = await verification.json();
    if (verificationData.verified && verificationData.email) {
        fetch("/user/clearVerification");
        root.render(<PasswordUpdate email={verificationData.email} />);
    } else {
        const id = await fetch("/user/id.json");
        const idData = await id.json();
        if (!idData.userId) {
            root.render(<Welcome />);
        } else {
            init();
            const app = (
                <Provider store={store}>
                    <App />
                </Provider>
            );

            root.render(app);
        }
    }
})();
