interface Jahre {
    [jahr: string]: string[];
}

interface Laender {
    [land: string]: Jahre;
}

export const getFerien = (land: string, jahr: string) => {
    return ferien[land][jahr];
}

const ferien: Laender = {
    'niedersachsen': {
        '2024': [
            '2024-01-01_2024-01-05',
            '2024-02-01_2024-02-02',
            '2024-03-18_2024-03-28',
            '2024-05-10_2024-05-10',
            '2024-05-21_2024-05-21',
            '2024-06-24_2024-08-03',
            '2024-10-04_2024-10-19',
            '2024-11-01_2024-11-01',
            '2024-12-23_2024-12-31',
        ],
    }
}