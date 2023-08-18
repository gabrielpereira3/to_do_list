import "@testing-library/jest-dom";
import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("App block", function () {
  test("Deve testar a todo list", async function () {
    const { user } = setup(<App />);
    const input = screen.getByRole("textbox");
    await user.type(input, "A");
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Total: 1")).toBeDefined();
    expect(screen.getByText("Completed: 0%")).toBeDefined();
  });
});
