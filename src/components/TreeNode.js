import { useState } from "react";
import { useTree } from "../context/TreeProvider";
import Menu from "./Menu";
import AddGroupUserModal from "./AddModal";
import deleteIcon from "../assets/icons/trash3.svg";
import downIcon from "../assets/icons/caret-down-fill.svg";
import upIcon from "../assets/icons/caret-up-fill.svg";
import userIcon from "../assets/icons/person-circle.svg";

export const TreeNode = ({ node }) => {
    const { addNode, deleteNode } = useTree();
    const [expanded, setExpanded] = useState(true);
    const [modalData, setModalData] = useState({ isOpen: false, name: '', type: '', editMode: false });
    const toggleDialog = () => setModalData({ ...modalData, isOpen: !modalData.isOpen });
    const onSelect = (type) => {
        switch (type) {
            case "Create Group": {
                setModalData({ name:'', isOpen: true, type: 'group', editMode: false });
                break;
            }
            case "Add/Remove Clinician": {
                setModalData({ ...modalData,name: '', isOpen: true, type: 'user' });
                break;
            }
            case "Remove Group": {
                deleteNode(node.id);
                break;
            }
            case "Edit Group": {
                setModalData({ name: node.name, isOpen: true, type: 'group', editMode: true });
                break;
            }
        }
    };
    const onSubmit = () => {
        addNode(node.id, modalData.name, modalData.type, modalData.editMode);
    }
    const handleNameChange = (name) => {
        setModalData({ ...modalData, name: name })
    }
    return (
        <div className="ml-4">
            <div className="flex items-center space-x-2">
                <span onClick={() => setExpanded(!expanded)} className="cursor-pointer">
                    {node.type === "group"
                        ? <img src={(expanded ? upIcon : downIcon)} />
                        : <img src={userIcon} />}
                </span>
                <span>{node.name}</span>
                {node.type === "group" && <Menu onSelect={onSelect} />}
                {node.type === "user" && <button
                    onClick={() => deleteNode(node.id)}
                    className="p-2 cursor-pointer bg-none rounded-sm focus:outline-none"
                >
                    <img src={deleteIcon} height={12} width={12} alt="Delete Icon" />
                </button>}
            </div>
            {expanded && node.children && (
                <div className="pl-4 border-l">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </div>
            )}
            <AddGroupUserModal isOpen={modalData.isOpen} onSubmit={onSubmit} onClose={toggleDialog}
                defaultValue={modalData.name} handleNameChange={handleNameChange} />
        </div>
    );
};