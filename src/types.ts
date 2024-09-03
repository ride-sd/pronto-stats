export type PRONTOCardData = {
    issuance: {
        date: string;
        time: string;
    };
    boardings: PRONTOBoardingData[];
    ridership: {
        bus: [string, number][];
        rail: number;
        railtrolley: number;
        railcoaster: number;
        railsprinter: number;
    };
    stops: {
        bus: [string, number][];
        rail: [string, number][];
    };
    checklists: {
        rapid: {
            '201': boolean,
            '204': boolean,
            '215': boolean,
            '225': boolean,
            '227': boolean,
            '235': boolean,
            '237': boolean,
        };
        scenics: {
            '398': boolean,
            '30': boolean,
            '84': boolean,
            '923': boolean,
            '225': boolean,
            '301': boolean,
            '308': boolean,
            '838': boolean,
            '901': boolean,
        };
        heart: {
            '201': boolean,
            '7': boolean,
            '13': boolean,
            '215': boolean,
            '235': boolean,
            '30': boolean,
            '929': boolean,
        };
    };
}

export type PRONTOBoardingData = {
    timestamp: {
        date: string;
        time: string;
    };
    line: string;
    stop: string;
    transfer: boolean;
}