export default function Me() {
    return (
        <>
            <div id="user">
                <img
                    src={this.props.imgurl}
                    onClick={this.settingsMenu}
                    id="profPic"
                />
                <p>
                    {this.props.name} {this.props.surname[0]}.
                </p>
            </div>
        </>
    );
}
