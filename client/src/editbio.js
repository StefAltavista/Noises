export default function EditBio({ bio, closeEdit, updateBio }) {
    async function submit(e) {
        e.preventDefault();

        const reqBody = JSON.stringify({ bio: e.target.bio.value });

        const response = await fetch("/editbio", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: reqBody,
        });
        const updated = await response.json();

        updateBio(updated);
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
