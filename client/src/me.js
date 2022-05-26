import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RecentUsers from "./recentUsers";
export default function Me() {
    const me = useSelector((state) => state.account);
    useEffect(() => {
        console.log(me);
    }, []);

    return (
        <>
            <Link to="/me">
                {" "}
                <div id="me">
                    <img src={me.imgurl} id="profPic" />
                    <p>
                        {me.name} {me.surname}
                    </p>
                </div>
            </Link>

            <RecentUsers />
        </>
    );
}
