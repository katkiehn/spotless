// this is the page where the user can customize how man rooms they have and how many tasks per week they want to do
import React, { useState } from "react";
import RoomType from "../components/room-type";

const Plan = () => {
    const [room, setRoom] = useState({ type: "bedroom", name: "Bedroom" });
    return (
        <div>
            <div>
                <h1>Rooms</h1>
                <RoomType
                    name={room.name}
                    type={room.type}
                    onNameChange={(e) => {
                        setRoom((existingRoom) => {
                            return { ...existingRoom, name: e.target.value };
                        });
                    }}
                    onTypeChange={(e) => {
                        setRoom((existingRoom) => {
                            return { ...existingRoom, type: e.target.value };
                        });
                    }}
                />
                <button>Add Room</button>
            </div>
            <div>
                <h1>How busy do you wanna be?</h1>
                <label>Tasks per week</label>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <button>Save</button>
            </div>
        </div>
    );
};

export default Plan;
