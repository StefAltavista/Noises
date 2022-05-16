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
    const { container } = render(<MyAccount bio="text" />);
    expect(container.querySelector("button").innerHTML).toBe("edit");
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    fireEvent.click(container.querySelector("#updateBioButton"));
    await waitFor(() => {
        fetch.mockResolvedValueOnce({
            async json() {
                return "";
            },
        });
        expect(container.querySelector("biography").innerHTML).toBe("");
    });
});
