const ROOM_TYPES = [
    {
        type: "kitchen",
        label: "Kitchen",
        tasks: [
            {
                type: "clean_fridge",
                description: (roomName) =>
                    `Clean the fridge in the ${roomName}`,
                frequency_per_quarter: 2,
            },
            {
                type: "clean_oven",
                description: (roomName) => `Clean the oven in the ${roomName}`,
                frequency_per_quarter: 3,
            },
            {
                type: "clean_dishwasher",
                description: (roomName) =>
                    `Clean the dishwasher in the ${roomName}`,
                frequency_per_quarter: 1,
            },
            {
                type: "clean_extractor_fan",
                description: (roomName) =>
                    `Clean the extractor fan in the ${roomName}`,
                frequency_per_quarter: 1,
            },
        ],
    },
    {
        type: "bathroom",
        label: "Bathroom",
        tasks: [
            {
                type: "clean_grout",
                description: (roomName) =>
                    `Scrub all the grout in the ${roomName}`,
                frequency_per_quarter: 3,
            },
            {
                type: "wash_shower_curtain",
                description: (roomName) =>
                    `Wash the shower curtain in the ${roomName}`,
                frequency_per_quarter: 2,
            },
            {
                type: "descale_faucet",
                description: (roomName) =>
                    `Descale the faucets and shower head in the ${roomName}`,
                frequency_per_quarter: 1,
            },
            {
                type: "clean_washing_machine",
                description: (roomName) =>
                    `Clean the washing machine drain and powder drawers in the ${roomName}`,
                frequency_per_quarter: 1,
            },
        ],
    },
    {
        type: "livingroom",
        label: "Living room",
        tasks: [
            {
                type: "clean_skirting_boards",
                description: (roomName) =>
                    `Clean the skirting boards in the ${roomName}`,
                frequency_per_quarter: 3,
            },
            {
                type: "clean_doors",
                description: (roomName) =>
                    `Clean the doors and door handles in the ${roomName}`,
                frequency_per_quarter: 2,
            },
            {
                type: "dust_shelves",
                description: (roomName) =>
                    `Dust shelves and surfaces in the ${roomName}`,
                frequency_per_quarter: 6,
            },
            {
                type: "clean_radiators",
                description: (roomName) =>
                    `Clean the radiators inside and out in the ${roomName}`,
                frequency_per_quarter: 1,
            },
        ],
    },
    {
        type: "bedroom",
        label: "Bedroom",
        tasks: [
            {
                type: "wash_mattress_protector",
                description: (roomName) =>
                    `Wash the mattress protector in the ${roomName}`,
                frequency_per_quarter: 1,
            },
            {
                type: "flip_mattress",
                description: (roomName) =>
                    `Flip the mattress in the ${roomName}`,
                frequency_per_quarter: 1,
            },
            {
                type: "clean_radiators",
                description: (roomName) =>
                    `Clean the radiators inside and out in the ${roomName}`,
                frequency_per_quarter: 1,
            },
            {
                type: "clean_doors",
                description: (roomName) =>
                    `Clean the doors and door handles in the ${roomName}`,
                frequency_per_quarter: 2,
            },
        ],
    },
];
module.exports = { ROOM_TYPES };
