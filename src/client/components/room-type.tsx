import React from "react";

interface RoomTypeProps {
    name: string;
    type: string;
    value?: string;
    onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onDelete: () => void;
}

const RoomType = (props: RoomTypeProps) => {
    return (
        <div className="room-type">
            <label>Type</label>
            <select value={props.type} onChange={props.onTypeChange}>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="bedroom">Bedroom</option>
                <option value="livingroom">Living room</option>
            </select>
            <label>Name of the room</label>
            <input
                type="text"
                value={props.name}
                onChange={props.onNameChange}
            />
            <button className="delete-button" onClick={props.onDelete}>
                X
            </button>
        </div>
    );
};

export default RoomType;
