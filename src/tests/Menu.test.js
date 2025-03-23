import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "../components/Menu";

const mockOnSelect = jest.fn();

describe("Menu Component", () => {
  test("renders menu button", () => {
    render(<Menu onSelect={mockOnSelect} />);
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  test("opens menu when button is clicked", () => {
    render(<Menu onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  test("closes menu when clicking outside", () => {
    render(<Menu onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("calls onSelect when a menu option is clicked", () => {
    render(<Menu onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByText("Edit Group"));
    expect(mockOnSelect).toHaveBeenCalledWith("Edit Group");
  });
});
