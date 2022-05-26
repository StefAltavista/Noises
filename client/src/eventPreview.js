import { Link } from "react-router-dom";
export default function EventPreview(props) {
    return (
        <Link to={`/event/${props.event.id}`}>
            <>
                <div id="eventPreview">
                    <p id="eventName"> {props.event.evt_name}</p>
                    <img src={props.event.poster} id="eventPreviewImg" />

                    <div id="eventInfo">
                        <p>{props.event.evt_location}</p>
                        <p>{props.event.start_date}</p>
                    </div>

                    {props.event.collaborators && (
                        <p>Collaborators: {props.event.collaborators}</p>
                    )}
                </div>
            </>
        </Link>
    );
}
