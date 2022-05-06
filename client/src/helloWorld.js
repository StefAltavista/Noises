const HelloWorld = () => {
    setInterval(HelloWorld, 1000);
    let time = new Date().toLocaleTimeString();
    return (
        <div>
            <div>
                <h2 style={{ "font-size": 250 }}>{time}.</h2>
            </div>
        </div>
    );
};
export { HelloWorld };
