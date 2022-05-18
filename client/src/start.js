//get the DOM
import ReactDOM from "react-dom";

//components
import Welcome from "./welcome.js";
import UpdatePs from "./updateps.js";
import App from "./app.js";
import { Provider } from "react-redux";
import reducer from "./redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import immutableState from "redux-immutable-state-invariant";
const store = createStore(
    reducer
    //composeWithDevTools(applyMiddleware(immutableState.default()))
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
            <UpdatePs email={verificationData.email} />,
            document.querySelector("main")
        );
    } else {
        const id = await fetch("/user/id.json");
        const idData = await id.json();
        if (!idData.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        }
    }
})();

//////////////////////////////////////////////////////////////////////
// Router without async/await (dot-then-hell)
//
// fetch("/user/verification").then((response) => {
//     response.json().then((data) => {
//         if (data.verified && data.email) {
//             fetch("/user/clearVerification");
//             ReactDOM.render(
//                 <UpdatePs email={data.email} />,
//                 document.querySelector("main")
//             );
//         } else {
//             fetch("/user/id.json")
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (!data.userId) {
//                         ReactDOM.render(
//                             <Welcome />,
//                             document.querySelector("main")
//                         );
//                     } else {
//                         ReactDOM.render(
//                             <img src="/logo.png" alt="logo" id="logo" />,
//                             document.querySelector("main")
//                         );
//                     }
//                 });
//         }
//     });
// });
