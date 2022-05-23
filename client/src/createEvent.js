let submit = {};

import { useState } from "react";

import Event from "./event.js";

export default function CreateEvent() {
    const [newEvent, setNewEvent] = useState({});
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };
    const nextStep = (e) => {
        console.log("submit", submit);
        console.log("newEvent", newEvent);
        e.preventDefault();
        console.log("form fields:", e.target.length);

        for (let i = 0; i < e.target.length; i++) {
            console.log(e.target[i].name);
            console.log(e.target[i].value);
            submit = { ...submit, [e.target[i].name]: e.target[i].value };
        }
        setNewEvent(submit);
        setStep(step + 1);
    };
    const backStep = () => {
        setStep(step - 1);
    };

    async function addPoster(e) {
        if (!e) {
            if (!newEvent.poster) {
                imgUrl = "/defaultEventImg.png";
                submit = { ...submit, poster: imgUrl };
                setNewEvent(submit);
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
        } else if (newEvent.poster) {
            setStep(step + 1);
        } else {
            imgUrl = "/defaultEventImg.png";
        }
        console.log(imgUrl);
        submit = { ...submit, poster: imgUrl };
        setNewEvent(submit);
    }

    const publish = () => {
        setNewEvent({ ...newEvent, public: true });
        saveToDb();
    };
    const saveDraft = () => {
        setNewEvent({ ...newEvent, public: false });
        saveToDb();
    };
    const saveToDb = () => {
        fetch("/addNewEvent", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(newEvent),
        })
            .then((res) => res.json())
            .then(({ rows }) => {
                console.log("New Event", rows[0]);

                setNewEvent(rows[0]);
                setStep(step + 1);
            });
    };
    const modify = () => {
        setStep(1);
    };
    return (
        <>
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
                                        defaultValue={newEvent.name}
                                        onChange={handleChange}
                                    ></input>
                                </div>

                                <div className="date">
                                    <p>Start date</p>
                                    <input
                                        required
                                        type="date"
                                        name="start_date"
                                        defaultValue={newEvent.startDate}
                                        onChange={handleChange}
                                    ></input>
                                    <p>Start time</p>
                                    <input
                                        required
                                        type="time"
                                        name="start_time"
                                        defaultValue={newEvent.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="date">
                                    <p>End date</p>

                                    <input
                                        required
                                        type="date"
                                        name="end_date"
                                        defaultValue={newEvent.endDate}
                                        onChange={handleChange}
                                    ></input>
                                    <p>End time</p>
                                    <input
                                        required
                                        type="time"
                                        name="end_time"
                                        defaultValue={newEvent.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="field">
                                    <p>Location</p>
                                    <input
                                        type="text"
                                        name="evt_location"
                                        defaultValue={newEvent.location}
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
                                    name="description"
                                    defaultValue={newEvent.description}
                                    onChange={handleChange}
                                ></textarea>
                                <p>Collaborators</p>
                                <input
                                    type="text"
                                    name="collaborators"
                                    defaultValue={newEvent.collaborators}
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
                                <p>{newEvent.evt_name} Preview</p>
                                <div>
                                    <button onClick={publish}>Publish</button>
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
                        <p id="eventName"> {newEvent.evt_name}</p>
                        <img src={newEvent.poster} id="eventPreviewImg" />

                        <div id="eventInfo">
                            <p>{newEvent.evt_location}</p>
                            <p>{newEvent.start_date}</p>
                            <p>{newEvent.start_time}</p>
                            <p>{newEvent.end_date}</p>
                            <p>{newEvent.end_time}</p>
                        </div>

                        <p> {newEvent.description}</p>
                        {newEvent.collaborators && (
                            <p>Collaborators: {newEvent.collaborators}</p>
                        )}
                    </div>
                )}
            </div>
            {step == 5 && (
                <div id="congratulations">
                    <p>Congratulations, your events has been saved</p>
                    <Event id={newEvent.id}></Event>
                </div>
            )}
        </>
    );
}
