//get the DOM
import ReactDOM from "react-dom";

//components
import Welcome from "./welcome.js";
import UpdatePs from "./updateps.js";

fetch("/user/verification").then((response) => {
    response.json().then((data) => {
        if (data.verified && data.email) {
            fetch("/user/clearVerification");
            ReactDOM.render(
                <UpdatePs email={data.email} />,
                document.querySelector("main")
            );
        } else {
            fetch("/user/id.json")
                .then((response) => response.json())
                .then((data) => {
                    if (!data.userId) {
                        ReactDOM.render(
                            <Welcome />,
                            document.querySelector("main")
                        );
                    } else {
                        ReactDOM.render(
                            <img src="/logo.png" alt="logo" id="logo" />,
                            document.querySelector("main")
                        );
                    }
                });
        }
    });
});
