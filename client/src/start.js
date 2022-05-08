//get the DOM
import ReactDOM from "react-dom";

//components
import Welcome from "./welcome.js";
fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img src="/logo.png" alt="logo" id="logo" />,
                document.querySelector("main")
            );
        }
    });
