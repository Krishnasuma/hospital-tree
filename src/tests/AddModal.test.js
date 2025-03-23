import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddGroupUserModal from "../components/AddModal";

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();
const mockHandleNameChange = jest.fn();

describe("AddGroupUserModal Component", () => {
  test("renders nothing when isOpen is false", () => {
    const { container } = render(
      <AddGroupUserModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders modal when isOpen is true", () => {
    render(
      <AddGroupUserModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
      />
    );
    expect(screen.getByText("Enter Details")).toBeInTheDocument();
  });

  test("calls handleNameChange when input changes", () => {
    render(
      <AddGroupUserModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
      />
    );
    const input = screen.getByPlaceholderText("Type here...");
    fireEvent.change(input, { target: { value: "Test Name" } });
    expect(mockHandleNameChange).toHaveBeenCalledWith("Test Name");
  });

  test("calls onClose when Cancel button is clicked", () => {
    render(
      <AddGroupUserModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("Submit button is disabled when input is empty", () => {
    render(
      <AddGroupUserModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
        defaultValue=""
      />
    );
    expect(screen.getByText("Submit")).toBeDisabled();
  });

  test("calls onSubmit and onClose when Submit button is clicked", () => {
    render(
      <AddGroupUserModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        handleNameChange={mockHandleNameChange}
        defaultValue="Valid Input"
      />
    );
    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
