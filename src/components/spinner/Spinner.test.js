import React from "react";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<Spinner />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
