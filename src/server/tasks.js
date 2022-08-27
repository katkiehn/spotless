const { ROOM_TYPES } = require("./config");

const enrichRoomsWithTasks = (rooms) => {
    return rooms.map((room) => {
        const tasks = getTasksByRoomType(room.type);
        return {
            ...room,
            tasks,
        };
    });
};

const getTasksByRoomType = (type) => {
    // shorthand automatically returns sth
    // comparison operator(===)returns a boolean value
    const roomType = ROOM_TYPES.find((room) => room.type === type);
    // optional chaining
    return roomType?.tasks || [];
};
// type here refers to the task type
const findMatchingTasks = (type, room_id, completedTasks) => {
    return completedTasks.filter(
        //
        (completedTask) =>
            type === completedTask.type && room_id === completedTask.room_id
    );
};

const getAllPossibleTasks = (rooms, completedTasks) => {
    const enrichedRooms = enrichRoomsWithTasks(rooms);

    let tasks = [];
    // in order to give task objects the key "room_id"
    // and combine tasks from all rooms into a single array
    for (const room of enrichedRooms) {
        for (const task of room.tasks) {
            const matchedTasks = findMatchingTasks(
                task.type,
                room.room_id,
                completedTasks
            );
            const frequency_per_quarter =
                task.frequency_per_quarter - matchedTasks.length;
            tasks.push({
                ...task,
                room_id: room.room_id,
                frequency_per_quarter,
            });
        }
    }

    return tasks.sort((a, z) => {
        // order tasks: highest frequency at the beginning of array
        return z.frequency_per_quarter - a.frequency_per_quarter;
    });
};

module.exports = { enrichRoomsWithTasks, getAllPossibleTasks };
