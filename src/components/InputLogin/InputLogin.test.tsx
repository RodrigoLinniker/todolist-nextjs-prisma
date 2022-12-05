import { render } from "@testing-library/react";
import { InputLogin } from "../../components/InputLogin";

describe("Header component", () => {
  it("renders correctly input email, hadle false", () => {
    const rendered = render(
      <InputLogin name={"email" || "password"} handleButton={false} />
    );

    const input = rendered.container.querySelector("input");

    expect(input?.className).toBe(
      "pl-4 w-84 outline-none border-2 focus:border-green-500 py-2 rounded-2xl"
    );
    expect(input?.name).toBe("email" || "password");
  });

  it("renders correctly input email, hadle true", () => {
    const rendered = render(
      <InputLogin name={"email" || "password"} handleButton={true} />
    );

    const input = rendered.container.querySelector("input");

    expect(input?.className).toBe(
      "pl-4 w-full outline-none border-2 focus:border-green-500 py-2 rounded-2xl rounded-tr-none rounded-br-none mt-3"
    );
    expect(input?.name).toBe("email" || "password");
  });
});
