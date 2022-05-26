import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import EventPreview from "./eventPreview";

export default function Calendar() {
    const [events, setEvents] = useState();
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState();
    useEffect(() => {
        fetch("/allEvents")
            .then((res) => res.json())
            .then((events) => setEvents(events));
    }, []);
    useEffect(() => {
        if (events) {
            const array = events.map((event) => {
                console.log("event", event);
                const when = `${event.start_date}T${event.start_time}`;
                let published;
                event.published
                    ? (published = "#3bf74b")
                    : (published = "#b5b4ae");
                return {
                    title: event.evt_name,
                    date: new Date(when),
                    id: event.id,
                    color: published,
                    link: `event/${event.id}`,
                    allDay: true,
                };
            });
            setCalendarEvents(array);
        }
    }, [events]);
    const closeEventPreview = () => {
        setSelectedEvent(false);
    };
    const eventClick = (arg) => {
        console.log(arg.event.id);
        fetch("/event", {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ id: arg.event.id }),
        })
            .then((res) => res.json())
            .then((evt) => {
                console.log(evt);
                setSelectedEvent(evt);
            });
    };
    const select = (info) => {
        console.log(info);
    };
    return (
        <div className="calendarPage">
            {selectedEvent && (
                <div className="calendarPreview" onClick={closeEventPreview}>
                    <div>
                        <EventPreview event={selectedEvent} />
                    </div>
                </div>
            )}
            <FullCalendar
                // defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={calendarEvents}
                eventClick={eventClick}
                select={select}
                className="calendar"
            />
        </div>
    );
}
