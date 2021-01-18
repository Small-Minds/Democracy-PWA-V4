import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders vote link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Vote/i);
  expect(linkElement).toBeInTheDocument();
});
