import React, {act} from "react";
import { render, screen } from "@testing-library/react";
import { TreeProvider, useTree } from "./TreeProvider";
import {Tree} from "../components/Tree";

const MockComponent = () => {
  const { addNode, deleteNode } = useTree();
  return (
    <div>
      <Tree />
      <button onClick={() => addNode(1, "New Group", "group")}>Add</button>
      <button onClick={() => deleteNode(1)}>Delete</button>
    </div>
  );
};

describe("TreeProvider Component", () => {
  test("renders initial tree structure", () => {
    render(
      <TreeProvider>
        <MockComponent />
      </TreeProvider>
    );
    expect(screen.getByText("All Hospitals")).toBeInTheDocument();
    expect(screen.getByText("Hospital A")).toBeInTheDocument();
  });

  test("adds a new group", () => {
    render(
      <TreeProvider>
        <MockComponent />
      </TreeProvider>
    );
    act(() => {
      screen.getByText("Add").click();
    });
    expect(screen.getByText("New Group")).toBeInTheDocument();
  });

  test("deletes a node", () => {
    render(
      <TreeProvider>
        <MockComponent />
      </TreeProvider>
    );
    act(() => {
      screen.getByText("Delete").click();
    });
    expect(screen.queryByText("All Hospitals")).not.toBeInTheDocument();
  });
});
