import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
export default function Event() {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [creator, setCreator] = useState();
    useEffect(() => {
        console.log("id", id);
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
                console.log("event use state", getEvent);
                fetch("/api/getuser", {
                    headers: { "content-type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ id: getEvent.creator }),
                })
                    .then((response) => response.json())
                    .then((user) => {
                        console.log(user);
                        setCreator(user);
                    });
            });
    }, []);
    return (
        <>
            {event && creator && (
                <div id="event">
                    <img src={event.poster} id="eventPoster" />
                    <p id="eventName">{event.evt_name}</p>
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
                        <p>{event.description}</p>
                    </div>
                </div>
            )}
        </>
    );
}
