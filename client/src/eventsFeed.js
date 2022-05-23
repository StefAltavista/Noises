import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventsFeed() {
    const [events, setEvents] = useState();
    useEffect(() => {
        fetch("/allEvents")
            .then((res) => res.json())
            .then((rows) => setEvents(rows));
    }, []);

    return (
        <>
            {events &&
                events.map((event) => {
                    return (
                        <Link to={`/event/${event.id}`} key={event.id}>
                            <>
                                <div id="eventPreview">
                                    <p id="eventName"> {event.evt_name}</p>
                                    <img
                                        src={event.poster}
                                        id="eventPreviewImg"
                                    />

                                    <div id="eventInfo">
                                        <p>{event.evt_location}</p>
                                        <p>{event.start_date}</p>
                                        <p>{event.start_time}</p>
                                        <p>{event.end_date}</p>
                                        <p>{event.end_time}</p>
                                    </div>

                                    <p> {event.description}</p>
                                    {event.collaborators && (
                                        <p>
                                            Collaborators: {event.collaborators}
                                        </p>
                                    )}
                                </div>
                            </>
                        </Link>
                    );
                })}
        </>
    );
}
