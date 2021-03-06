export default function EditBio({ bio, closeEdit, updateBio }) {
    async function submit(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        // e.preventDefault();

        const response = await fetch("/editbio", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ bio: e.target.bio.value }),
        });
        const updated = await response.json();
        updateBio(updated);

        // fetch("/editbio", {
        //     headers: { "content-type": "application/json" },
        //     method: "POST",
        //     body: JSON.stringify({ bio: e.target.bio.value }),
        // })
        //     .then((response) => response.json())
        //     .then((updated) => {
        //         console.log("bio:", typeof updated);
        //         updateBio(updated);
        //     });
    }

    return (
        <div id="overlay">
            <p onClick={closeEdit}>X</p>
            <p>update your biography</p>
            <form id="editBio" onSubmit={submit}>
                <textarea value={bio} name="bio"></textarea>
                <button id="updateBioButton">update</button>
            </form>
        </div>
    );
}
