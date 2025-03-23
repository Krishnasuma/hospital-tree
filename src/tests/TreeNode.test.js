import React from "react";
import { render, screen } from "@testing-library/react";
import { TreeNode } from "../components/TreeNode";
import { useTree } from "../context/TreeProvider";

jest.mock("../context/TreeProvider", () => ({
    useTree: jest.fn(),
}));

describe("TreeNode Component", () => {
    const mockAddNode = jest.fn();
    const mockDeleteNode = jest.fn();

    beforeEach(() => {
        useTree.mockReturnValue({
            addNode: mockAddNode,
            deleteNode: mockDeleteNode,
        });
    });

    test("renders TreeNode with correct name", () => {
        render(<TreeNode node={{ id: 1, name: "Root Group", type: "group", children: [] }} />);
        expect(screen.getByText("Root Group")).toBeInTheDocument();
    });
});
