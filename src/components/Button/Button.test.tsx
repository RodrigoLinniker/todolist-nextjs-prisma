import { render, screen } from "@testing-library/react";
import { Button } from "../../components/Button";

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Button text="TesteText" />);

    expect(screen.getByText("TesteText")).toBeInTheDocument();
  });
});
