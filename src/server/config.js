const ROOM_TYPES = [
    {
        type: "kitchen",
        label: "Kitchen",
        tasks: [
            {
                type: "clean_fridge",
                description: "Clean the fridge",
                frequency_per_quarter: 2,
            },
            {
                type: "clean_oven",
                description: "Clean the oven",
                frequency_per_quarter: 3,
            },
            {
                type: "clean_dishwasher",
                description: "Clean the dishwasher",
                frequency_per_quarter: 1,
            },
            {
                type: "clean_extractor_fan",
                description: "Clean the extractor fan",
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
                description: "Scrub all the grout",
                frequency_per_quarter: 3,
            },
            {
                type: "wash_shower_curtain",
                description: "Wash the shower curtain",
                frequency_per_quarter: 2,
            },
            {
                type: "descale_faucet",
                description: "Descale the faucets and shower head",
                frequency_per_quarter: 1,
            },
            {
                type: "clean_washing_machine",
                description:
                    "Clean the washing machine drain and powder drawers",
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
                description: "Clean the skirting boards",
                frequency_per_quarter: 3,
            },
            {
                type: "clean_doors",
                description: "Clean the doors and door handles",
                frequency_per_quarter: 2,
            },
            {
                type: "dust_shelves",
                description: "Dust shelves and surfaces",
                frequency_per_quarter: 6,
            },
            {
                type: "clean_radiators",
                description: "Clean the radiators inside and out",
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
                description: "Wash the mattress protector",
                frequency_per_quarter: 1,
            },
            {
                type: "flip_mattress",
                description: "Flip the mattress",
                frequency_per_quarter: 1,
            },
            {
                type: "clean_radiators",
                description: "Clean the radiators inside and out",
                frequency_per_quarter: 1,
            },
            {
                type: "clean_doors",
                description: "Clean the doors and door handles",
                frequency_per_quarter: 2,
            },
        ],
    },
];
