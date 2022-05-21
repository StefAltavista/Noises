import { useEffect, useRef } from "react";
import { getMessages, newMessage } from "./redux/messages/slice.js";
import { useSelector, useDispatch } from "react-redux";
//get user socket.io
import { socket } from "./socketInit.js";

export default function NoisesPool() {
    const elemRef = useRef();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages);
    const myId = useSelector((state) => state.account.id);

    useEffect(() => {
        socket.emit("GET_MESSAGES");
        socket.on("MESSAGES", function (messages) {
            dispatch(getMessages(messages));
            console.log(messages);
            elemRef.current.scrollIntoView({ behavior: "smooth" });
        });
        socket.on("newMessage", function ({ message }) {
            dispatch(newMessage(message));
            elemRef.current.scrollIntoView({ behavior: "smooth" });
        });
        return () => {
            socket.off("sendMessage");
            socket.off("newMessage");
            socket.disconnect();
        };
    }, []);

    function submit(e) {
        e.preventDefault();
        const message = {
            sender_id: myId,
            text: e.target.messageInput.value,
        };
        socket.emit("sendMessage", {
            message,
        });

        e.target.messageInput.value = "";
    }

    return (
        <div id="groupChat">
            <p>Noises Pool</p>
            <div>
                {messages && (
                    <ul id="messages">
                        {messages.map((msg) => (
                            <li key={msg.id} id="message" ref={elemRef}>
                                <img src={msg.imgurl} id="chatImg" />
                                <strong>
                                    {msg.name} {msg.surname}:{" "}
                                </strong>
                                <p>{msg.text}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <form onSubmit={submit}>
                <input type="text" name="messageInput"></input>
            </form>
        </div>
    );
}
