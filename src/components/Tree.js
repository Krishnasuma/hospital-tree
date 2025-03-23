import {useTree} from "../context/TreeProvider";
import {TreeNode} from "./TreeNode";

export const Tree = () => {
    const { treeData } = useTree();
    return (
      <div className="p-4 bg-gray-100">
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    );
  };
