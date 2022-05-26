import { useEffect } from "react";
import { useReducer, useState } from "react";
import Event from "./event";
export default function EditEvent(props) {
    const { eventToEdit } = props;
    const [editEvent, updateedEditEvent] = useReducer(
        (editEvent, updates) => ({
            ...editEvent,
            ...updates,
        }),
        eventToEdit
    );
    useEffect(() => {
        console.log("edit:", editEvent);
    }, []);

    const [step, setStep] = useState(1);
    const [updatedEvent, setUpdatedEvent] = useState();

    const handleChange = (e) => {
        updateedEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    };
    const nextStep = (e) => {
        console.log("editEvent", editEvent);
        e.preventDefault();
        for (let i = 0; i < e.target.length; i++) {
            console.log(e.target[i].name);
            console.log(e.target[i].value);
            updateedEditEvent({ [e.target[i].name]: e.target[i].value });
        }
        setStep(step + 1);
    };
    const backStep = () => {
        setStep(step - 1);
    };

    async function addPoster(e) {
        if (!e) {
            if (!editEvent.poster) {
                imgUrl = "/defaultEventImg.png";
                updateedEditEvent({ poster: imgUrl });
                return;
            } else return;
        }
        e.preventDefault();
        let imgUrl;
        if (e.target.poster.files[0]) {
            const formData = new FormData();
            formData.append("name", "eventPoster");
            formData.append("file", e.target.poster.files[0]);
            const response = await fetch("/upload_event_poster", {
                method: "POST",
                body: formData,
            });
            imgUrl = await response.json();
        } else if (editEvent.poster) {
            setStep(step + 1);
        } else {
            imgUrl = "/defaultEventImg.png";
        }
        console.log(imgUrl);
        updateedEditEvent({ poster: imgUrl });
    }

    const publish = () => {
        console.log("editevent", editEvent);
        if (editEvent.published) {
            saveToDb();
        }
        updateedEditEvent({ published: true });
    };
    const saveDraft = () => {
        if (!editEvent.published) {
            saveToDb();
        }
        updateedEditEvent({ published: false });
    };
    useEffect(() => {
        if (step == 4) {
            saveToDb();
        }
    }, [editEvent.published]);

    const saveToDb = () => {
        console.log("save to db:", editEvent);
        fetch("/updateEvent", {
            headers: { "content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify(editEvent),
        })
            .then((res) => res.json())
            .then((updatedEvent) => {
                console.log("updated event", updatedEvent);
                setUpdatedEvent(updatedEvent);
                setStep(step + 1);
            });
    };
    const modify = () => {
        setStep(1);
    };
    return (
        <>
            {step < 5 && (
                <div id="editEventPage">
                    <div id="eventEditor">
                        {step == 1 && (
                            <div id="Step1">
                                <form onSubmit={nextStep}>
                                    <div className="field">
                                        <p>Name</p>
                                        <input
                                            required
                                            type="text"
                                            name="evt_name"
                                            defaultValue={editEvent.evt_name}
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="date">
                                        <p>Start date</p>
                                        <input
                                            required
                                            type="date"
                                            name="start_date"
                                            defaultValue={editEvent.start_date}
                                            onChange={handleChange}
                                        ></input>
                                        <p>Start time</p>
                                        <input
                                            required
                                            type="time"
                                            name="start_time"
                                            defaultValue={editEvent.start_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="date">
                                        <p>End date</p>

                                        <input
                                            required
                                            type="date"
                                            name="end_date"
                                            defaultValue={editEvent.end_date}
                                            onChange={handleChange}
                                        ></input>
                                        <p>End time</p>
                                        <input
                                            required
                                            type="time"
                                            name="end_time"
                                            defaultValue={editEvent.end_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="field">
                                        <p>Location</p>
                                        <input
                                            type="text"
                                            name="evt_location"
                                            defaultValue={
                                                editEvent.evt_location
                                            }
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <button>Next</button>
                                </form>
                            </div>
                        )}

                        {step == 2 && (
                            <div id="Step2">
                                <form onSubmit={addPoster}>
                                    <p>Poster</p>
                                    <input type="file" name="poster"></input>

                                    <button id="uploadImg">Upload</button>
                                </form>
                                <button
                                    onClick={() => {
                                        addPoster();
                                        setStep(step + 1);
                                    }}
                                >
                                    Next
                                </button>
                                <button onClick={backStep}>Back</button>
                            </div>
                        )}

                        {step == 3 && (
                            <div id="Step3">
                                <form onSubmit={nextStep}>
                                    <p>Description</p>
                                    <textarea
                                        name="evt_description"
                                        defaultValue={editEvent.evt_description}
                                        onChange={handleChange}
                                    ></textarea>
                                    <p>Collaborators</p>
                                    <input
                                        type="text"
                                        name="collaborators"
                                        defaultValue={editEvent.collaborators}
                                        onChange={handleChange}
                                    ></input>

                                    <button>Next</button>
                                </form>
                                <button onClick={backStep}>Back</button>
                            </div>
                        )}
                        {step == 4 && (
                            <div id="Step4">
                                <div id="previewHeader">
                                    <div>
                                        <button onClick={publish}>
                                            Publish
                                        </button>
                                        <button onClick={saveDraft}>
                                            Save Draft
                                        </button>
                                        <button onClick={modify}>Modify</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {step < 5 && (
                        <div id="eventPreview">
                            <p id="eventName"> {editEvent.evt_name}</p>
                            <img src={editEvent.poster} id="eventPreviewImg" />

                            <div id="eventInfo">
                                <p>{editEvent.evt_location}</p>
                                <p>{editEvent.start_date}</p>
                                <p>{editEvent.start_time}</p>
                                <p>{editEvent.end_date}</p>
                                <p>{editEvent.end_time}</p>
                            </div>

                            <p> {editEvent.description}</p>
                            {editEvent.collaborators && (
                                <p>Collaborators: {editEvent.collaborators}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
            {step == 5 && updatedEvent.id && (
                <div id="congratulations">
                    {updatedEvent.published && (
                        <p>Congratulations, your events has been Published</p>
                    )}
                    {!updatedEvent.published && (
                        <p>Your events has been saved</p>
                    )}
                    <Event id={updatedEvent.id}></Event>
                </div>
            )}
        </>
    );
}
