//  page where user can change their account details
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Delete from "../components/delete";
import { User, Room } from "../types";
const Account = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("/api/plan")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRooms(data.rooms);
                    setUser(data.user);
                }
            });
    }, []);

    return (
        <>
            <div className="account-wrapper">
                <div className="account">
                    <div>
                        <img src="make-bed.svg" alt="" />
                    </div>
                    <div className="account-text">
                        <h4>Me</h4>
                        <p>Name : {user?.name}</p>
                        <p>Email : {user?.email}</p>
                    </div>
                </div>
                <div className="account">
                    <div>
                        <img src="scrub-toilet.svg" alt="" />
                    </div>
                    <div className="account-text">
                        <h4>My Home</h4>
                        <p>Rooms I have on spotless:</p>
                        <ul>
                            {rooms.map((room) => (
                                <li key={room.room_id}>{room.name}</li>
                            ))}
                        </ul>

                        <Link to="/plan" className="me-link">
                            Change my rooms
                        </Link>
                    </div>
                </div>
                <div className="account">
                    <div>
                        <img src="fridge.svg" alt="" />
                    </div>
                    <div className="account-text">
                        <h4> My Household</h4>
                        <p>
                            Here we can eventually create a household/group with
                            several people
                        </p>
                    </div>
                </div>

                <Delete />
            </div>
        </>
    );
};

export default Account;
