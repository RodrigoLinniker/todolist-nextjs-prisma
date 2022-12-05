import { render, screen } from "@testing-library/react";
import Dashboard from "../../pages/dashboard";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => [
      {
        user: { id: "testeId", name: "testeName", email: "teste@email.com" },
      },
      true,
    ],
  };
});

jest.mock("axios");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const todos = [
  {
    id: 1,
    description: "descriptionTodo",
    userId: "userId",
  },
];

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Dashboard todos={todos} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("descriptionTodo")).toBeInTheDocument();
  });
});
