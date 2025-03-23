import React from "react";
import { render, screen } from "@testing-library/react";
import { Tree } from "../components/Tree";
import { useTree } from "../context/TreeProvider";

jest.mock("../context/TreeProvider", () => ({
  useTree: jest.fn(),
}));

describe("Tree Component", () => {
  test("renders tree with nodes", () => {
    useTree.mockReturnValue({
      treeData: [
        { id: 1, name: "Root Node", children: [] },
        { id: 2, name: "Child Node", children: [] },
      ],
    });

    render(<Tree />);
    expect(screen.getByText("Root Node")).toBeInTheDocument();
    expect(screen.getByText("Child Node")).toBeInTheDocument();
  });

  test("renders empty tree when no data is present", () => {
    useTree.mockReturnValue({ treeData: [] });
    render(<Tree />);
    expect(screen.queryByText("Root Node")).not.toBeInTheDocument();
  });
});
