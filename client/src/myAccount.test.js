import { render, fireEvent, waitFor } from "@testing-library/react";
import MyAccount from "./myAccount";
import EditBio from "./editbio";

test("When no Bio, button displays ADD BIO", () => {
    const { container } = render(<MyAccount />);
    expect(container.querySelector("button").innerHTML).toBe("add bio");
});
test("When props.bio, button displays ADD BIO", () => {
    const { container } = render(<MyAccount bio="hey" />);
    expect(container.querySelector("button").innerHTML).toBe("edit");
});

test("Open textArea on edit bio click", () => {
    const { container } = render(<MyAccount />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("#overlay")).toBeTruthy();
});

test("Clicking on Save button causes an HTTP request", async () => {
    //const { container } = render(<MyAccount bio="text" />);
    const { container } = render(<EditBio submit={jest.fn()} />);
    expect(container.querySelector("button").innerHTML).toBe("update");
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    fireEvent.click(container.querySelector("#updateBioButton"));
    fetch.mockResolvedValueOnce({
        async json() {
            return "";
        },
    });
    await waitFor(() => {
        expect(container.querySelector("biography").innerHTML).toBe("");
    });
});
// LET'S WRITE our first test:
// remember test takes two arguments string + cb function
// we don't actually want to make server requests for actual data, we need to mock our fetch return
// test("app eventually renders a div", async()=>{
// 	fetch.mockResolvedValue({
//         async json() {
//             return {
// 						first: "Merle",
// 						last: "Fischer",
// 						url: "someUrl",
// 						id: 1,
// 	}
// })
