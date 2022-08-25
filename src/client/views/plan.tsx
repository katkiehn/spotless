// this is the page where the user can customize how man rooms they have and how many tasks per week they want to do
import React, { useState } from "react";
import RoomType from "../components/room-type";
const NEW_ROOM = { type: "bedroom", name: "Bedroom" };
const Plan = () => {
    const [rooms, setRooms] = useState([NEW_ROOM]);
    return (
        <div>
            <div>
                <h1>Rooms</h1>
                {rooms.map((room, index) => {
                    return (
                        <RoomType
                            name={room.name}
                            type={room.type}
                            onDelete={() => {
                                setRooms((existingRooms) => {
                                    return existingRooms.filter((r, i) => {
                                        return i !== index;
                                    });
                                });
                            }}
                            onNameChange={(e) => {
                                setRooms((existingRooms) => {
                                    return existingRooms.map((r, i) => {
                                        if (index === i) {
                                            return {
                                                ...r,
                                                name: e.target.value,
                                            };
                                        } else {
                                            return r;
                                        }
                                    });
                                });
                            }}
                            onTypeChange={(e) => {
                                setRooms((existingRooms) => {
                                    return existingRooms.map((r, i) => {
                                        if (index === i) {
                                            return {
                                                ...r,
                                                type: e.target.value,
                                            };
                                        } else {
                                            return r;
                                        }
                                    });
                                });
                            }}
                        />
                    );
                })}
                <button
                    onClick={() => {
                        setRooms((existingRooms) => {
                            return [...existingRooms, NEW_ROOM];
                        });
                    }}
                >
                    Add Room
                </button>
            </div>
            <div>
                <h1>How busy do you wanna be?</h1>
                <div>
                    <label>Tasks per week</label>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <button>Save</button>
            </div>
        </div>
    );
};

export default Plan;
