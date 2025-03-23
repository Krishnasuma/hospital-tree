import React from "react";
import {Tree} from "./components/Tree";
import {TreeProvider} from "./context/TreeProvider";

export default function App() {
  return (
    <TreeProvider>
      <div className="p-8 min-h-screen bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">Clinician Groups</h1>
        <Tree />
      </div>
    </TreeProvider>
  );
}
