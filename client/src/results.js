export default function Results({ allResults }) {
    if (allResults) {
        console.log("from results com", allResults);
    }

    return (
        <>
            {allResults && (
                <div id="allResults">
                    {allResults.map((x) => {
                        return (
                            <div id="eachResult" key={x.id}>
                                <img src={x.imgurl} />
                                <p>
                                    {x.name} {x.surname}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
            {allResults && (
                <div>
                    <p>No Results</p>
                </div>
            )}
        </>
    );
}
