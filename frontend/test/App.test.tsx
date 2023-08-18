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
    const input = screen.getByLabelText("todo-description-input");
    await user.type(input, "A");
    const button = screen.getByLabelText("add-todo-button");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 1");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
    expect(screen.getByLabelText("todo-description")).toHaveTextContent("A");
    expect(screen.getByLabelText("todo-done")).toHaveTextContent("false");
    await user.type(input, "B");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 2");
  });
});
