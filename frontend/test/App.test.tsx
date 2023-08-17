import "@testing-library/jest-dom";
import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App block", function () {
  test("Deve testar a todo list", async function () {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("Total: 3");
    expect(screen.getByRole("heading")).toHaveTextContent("Completed: 33%");
    // expect(getByText("Total: 3")).toBeInTheDocument();
    // expect(getByText("Completed: 33%")).toBeInTheDocument();
  });
});
