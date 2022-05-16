export default function Results(Results) {
    const { allResults } = Results;
    if (allResults) {
        console.log(allResults);
    }

    return (
        <>
            {allResults && (
                <div id="allResults">
                    hello
                    {allResults.forEach((x) => {
                        return (
                            <div id="eachResult">
                                <img src={x.imgurl} />
                                <p>
                                    {x.name} {x.surname}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
