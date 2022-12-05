import { fireEvent, render, screen } from "@testing-library/react";
import { getSession, signIn } from "next-auth/react";
import Home, { getServerSideProps } from "../../pages";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react");
jest.mock("next/link");

jest.mock("next/legacy/image");

describe("Home Page", () => {
  it("renders correctly", () => {
    render(<Home />);

    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Ou entre com")).toBeInTheDocument();
  });

  it("redirect user correctly", async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { id: "testeId", name: "testeName", email: "teste@email.com" },
    });

    const response = await getServerSideProps({} as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/dashboard",
        }),
      })
    );
  });
});
