export default function EditBio({ bio, closeEdit, updateBio }) {
    async function submit(e) {
        e.preventDefault();

        const reqBody = JSON.stringify({ newbio: e.target.bio.value });
        console.log("req body:", reqBody);

        const response = await fetch("/editbio", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: reqBody,
        });
        const newBio = await response.json();

        updateBio(newBio.imgurl);
    }

    return (
        <div id="overlay">
            <p onClick={closeEdit}>X</p>
            <p>update your biography</p>
            <form id="editBio" onSubmit={submit}>
                <textarea value={bio} name="bio"></textarea>
                <button>update</button>
            </form>
        </div>
    );
}
