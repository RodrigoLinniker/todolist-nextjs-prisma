import { render, screen } from "@testing-library/react";
import { Modal } from "../../components/Modal";

describe("Modal component", () => {
  it("renders correctly", () => {
    render(
      <Modal
        visible={true}
        typeModal={false}
        onClose={() => {
          "functionTeste";
        }}
        items={{ id: 1, description: "descritionTeste", userId: "userIdTeste" }}
      />
    );

    expect(screen.getByText("Editar Task")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  it("renders correctly", () => {
    render(
      <Modal
        visible={true}
        typeModal={true}
        onClose={() => {
          "functionTeste";
        }}
        items={{ id: 1, description: "descritionTeste", userId: "userIdTeste" }}
      />
    );

    expect(screen.getByText("Deseja Excluir ?")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });
});
