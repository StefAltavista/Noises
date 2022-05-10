export default function ImgModal({ closeModal, updatePicture }) {
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", "profilePic");
        formData.append("file", e.target[0].files[0]);

        const response = await fetch("/upload_profile_pic", {
            method: "POST",
            body: formData,
        });
        const newimgUrl = await response.json();
        updatePicture(newimgUrl);
    }
    return (
        <div id="overlay">
            <p onClick={closeModal}>X</p>
            <p>update your profile picture</p>
            <form id="imgModal" onSubmit={submit}>
                <input type="file" required name="file"></input>
                <button>update</button>
            </form>
        </div>
    );
}
