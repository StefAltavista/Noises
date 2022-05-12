import { useState } from "react";

export function HookExample(props) {
    const [name, setName] = useState("Aspartame");

    return (
        <div>
            <p>name:{name}</p>
            <button onClick={() => setName(name.toUppercase)}></button>
        </div>
    );
}
