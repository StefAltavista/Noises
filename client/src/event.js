import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import UpdateEvent from "./editEvent";

export default function Event(props) {
    let id;

    if (props.id) {
        id = props.id;
    } else {
        id = useParams().id;
    }
    let account = useSelector((state) => {
        return state.account;
    });
    const [event, setEvent] = useState();
    const [creator, setCreator] = useState();
    const [mine, setMine] = useState();
    const [editEvent, setEditEvent] = useState();
    useEffect(() => {
        fetch("/event", {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((getEvent) => {
                console.log("from event", getEvent);
                setEvent(getEvent);
                return getEvent;
            })
            .then((getEvent) => {
                fetch("/api/getuser", {
                    headers: { "content-type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ id: getEvent.creator }),
                })
                    .then((response) => response.json())
                    .then((user) => {
                        setCreator(user);
                    });
            });
    }, []);
    useEffect(() => {
        if (creator) {
            if (creator.id == account.id) {
                console.log("my event");
                setMine(true);
            }
        }
    }, [account] && [creator]);

    function edit() {
        setEditEvent(!editEvent);
    }
    return (
        <>
            {mine && (
                <button onClick={edit} id="editEvenButton">
                    Edit
                </button>
            )}
            {event && creator && !editEvent && (
                <div id="event">
                    <p id="eventName">{event.evt_name}</p>
                    <img src={event.poster} id="eventPoster" />

                    <Link to={`/user/${creator.id}`}>
                        <p>
                            Created by {creator.name} {creator.surname}
                        </p>
                    </Link>
                    <div id="when">
                        <p>
                            Starts: {event.start_date} {event.start_time}
                        </p>
                        <p>
                            Ends : {event.end_date} {event.end_time}
                        </p>
                    </div>
                    <div id="eventBody">
                        <p>{event.evt_location}</p>
                        <p>{event.evt_description}</p>
                    </div>
                </div>
            )}
            {editEvent && <UpdateEvent eventToEdit={event} />}
        </>
    );
}
