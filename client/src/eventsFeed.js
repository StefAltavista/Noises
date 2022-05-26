import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventPreview from "./eventPreview";

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
                    return <EventPreview event={event} key={event.id} />;
                })}
        </>
    );
}
