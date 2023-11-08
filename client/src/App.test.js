import { render, screen } from "@testing-library/react";
import Navbar from "./components/common/Navbar";

/* This is a test that is testing the App component. It is testing that the heading is correct. */
describe("Navbar", () => {
  it("should have exact heading", () => {
    /* Rendering the Navbar component. */
    render(<Navbar />);

    /* Getting the element with the test id of "app-header-heading". */
    const mainHeading = screen.getByTestId("app-header-heading");

    /* Checking that the innerHTML of the element with the test id of "app-header-heading" is equal to
    "Book Talks". */
    expect(mainHeading.innerHTML).toBe("Book Talks");
  });
});
