import { useState, createContext, useContext } from "react";

const initialTree = [
    {
        id: 1,
        name: "All Hospitals",
        type: "group",
        children: [
            {
                id: 2,
                name: "Hospital A",
                type: "group",
                children: [
                    { id: 3, name: "Shoulder", type: "user" },
                    { id: 4, name: "Knee", type: "user" }
                ],
            },
            {
                id: 5,
                name: "Hospital B",
                type: "group",
                children: [
                    { id: 6, name: "Anxiety", type: "user" },
                    { id: 7, name: "Depression", type: "user" }
                ],
            }
        ],
    },
];
export const TreeContext = createContext();
export const useTree = () => useContext(TreeContext);

export const TreeProvider = ({ children }) => {
    const [treeData, setTreeData] = useState(initialTree);

    // Add Node
    const addNode = (parentId, name, type, editMode = false) => {
        debugger;
        setTreeData((prev) => {
            const newTree = [...prev];

            const findAndAdd = (nodes) => {
                nodes.forEach((node) => {
                    if (node.id === parentId) {
                        if (editMode && type === 'group') {
                            node.name = name;
                        } else {
                            node.children.push({
                                id: Date.now(),
                                name,
                                type,
                                children: type === "group" ? [] : undefined,
                            });
                        }
                    } else if (node.children) {
                        findAndAdd(node.children);
                    }
                });
            };

            findAndAdd(newTree);
            return newTree;
        });
    };

    // Delete Node
    const deleteNode = (nodeId) => {
        setTreeData((prev) => {
            const removeNode = (nodes) =>
                nodes.filter((node) => {
                    if (node.id === nodeId) return false;
                    if (node.children) node.children = removeNode(node.children);
                    return true;
                });

            return removeNode(prev);
        });
    };

    return (
        <TreeContext.Provider value={{ treeData, addNode, deleteNode }}>
            {children}
        </TreeContext.Provider>
    );
};