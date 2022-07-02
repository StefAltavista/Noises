import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Search({ myId, searchResults, toggleSearch }) {
    const [search, setSearch] = useState();
    const [match, setMatch] = useState();
    console.log(myId);
    useEffect(() => {
        let abort = false;

        if (search) {
            fetch(`/api/search?s=${search}`)
                .then((res) => {
                    return res.json();
                })
                .then(({ matches }) => {
                    if (!abort) {
                        if (matches) {
                            setMatch(matches);
                            searchResults(matches);
                        } else {
                            setMatch(false);
                            searchResults(false);
                        }
                        matches ? setMatch(matches) : setMatch(false);
                    }
                });
        } else {
            setMatch(false);
        }

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
                    {match.map((x) => {
                        if (x.id == myId) return;
                        return (
                            <li onClick={toggleSearch} key={x.id}>
                                <Link to={`/user/${x.id}`}>
                                    <div id="each">
                                        <img src={x.imgurl} />
                                        <p> {x.name} </p>
                                        <p> {x.surname}</p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}

                    <p id="showMore">
                        <Link to="/results" onClick={toggleSearch}>
                            <p>Show all results</p>
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
