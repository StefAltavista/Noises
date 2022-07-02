import { useEffect, useRef } from "react";
import { getMessages, newMessage } from "../redux/messages/slice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//get user socket.io
import { socket } from "../socketInit.js";

export default function NoisyPool() {
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
        <div id="NoisyPool">
            <div id="groupChatHead">
                <p>Noisy Pool</p>
            </div>

            {messages && (
                <ul id="groupChat">
                    {messages.map((msg) => (
                        <li key={msg.id} id="message" ref={elemRef}>
                            <Link to={`/user/${msg.sender_id}`}>
                                <div id="chatUser">
                                    <img src={msg.imgurl} id="chatImg" />
                                    <p id="messageSenderName">
                                        {msg.name} {msg.surname[0]}.
                                    </p>
                                </div>

                                <p>{msg.text}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={submit} id="chatInput">
                <input
                    type="text"
                    name="messageInput"
                    autoComplete="off"
                ></input>
                <img src="/logo.png" id="sendMessage" />
            </form>
        </div>
    );
}
