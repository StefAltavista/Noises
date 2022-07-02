export default function ImgModal({ closeModal, updatePicture }) {
    let loading = false;
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", "profilePic");
        formData.append("file", e.target[0].files[0]);
        loading = true;
        console.log("loading");
        const response = await fetch("/upload_profile_pic", {
            method: "POST",
            body: formData,
        });
        const { imgurl } = await response.json();
        console.log(imgurl);
        loading = false;
        updatePicture(imgurl);
    }

    return (
        <div id="overlay">
            <p onClick={closeModal}>X</p>
            <p>update your profile picture</p>
            <form id="imgModal" onSubmit={submit}>
                <input type="file" required name="file"></input>
                <button>update</button>
            </form>

            {loading ? (
                <div id="loading">
                    <p>Loading...</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
