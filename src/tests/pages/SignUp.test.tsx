import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Home from "../../pages";
import Signup from "../../pages/signup";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/legacy/image");
jest.mock("next/link");

describe("Signup component", () => {
  it("renders correctly", () => {
    render(<Signup />);

    expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("redirect signin correctly", async () => {
    const routerMocked = jest.mocked(useRouter);
    render(<Signup />);

    fireEvent.click(screen.getByText("Cadastrar"));

    await act(async () => render(<Home />));
    expect(routerMocked).toHaveBeenCalled();
  });
});
