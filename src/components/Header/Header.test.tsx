import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header";

jest.mock("next/image");

describe("Header component", () => {
  it("renders correctly", () => {
    render(
      <Header
        session={{
          expires: "1",
          user: {
            id: "TesteId",
            email: "TesteEmail",
            name: "TesteNome",
            image: "TesteImage",
          },
        }}
      />
    );

    expect(screen.getByText("ToDo List")).toBeInTheDocument();
    expect(screen.getByText(".")).toBeInTheDocument();
    expect(screen.getByText("TESTENOME")).toBeInTheDocument();
    expect(screen.getByText("TesteEmail")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });
});
