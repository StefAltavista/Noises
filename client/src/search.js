import { useState, useEffect } from "react";

export default function Search({ myId }) {
    const [search, setSearch] = useState();
    const [match, setMatch] = useState();
    console.log(myId);
    useEffect(() => {
        let abort = false;
        console.log("search", search);
        if (search) {
            fetch(`/api/search?s=${search}`)
                .then((res) => {
                    return res.json();
                })
                .then(({ matches }) => {
                    console.log("from db:", matches);
                    if (!abort) {
                        matches ? setMatch(matches) : setMatch(false);
                    }
                });
        } else {
            setMatch(false);
        }
        console.log("Match:", match);

        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <div>
            <input
                name="search"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input>

            {match && (
                <div id="results">
                    {match.map((m) => {
                        if (m.id == myId) return;
                        return (
                            <li key={m.id}>
                                <div id="each">
                                    <img src={m.imgurl} />
                                    <p> {m.name} </p>
                                    <p> {m.surname}</p>
                                </div>
                            </li>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
