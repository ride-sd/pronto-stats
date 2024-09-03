import Papa from 'papaparse';
import { PRONTOCardData, PRONTOBoardingData } from './types';

export default function ParseCard({ setCardData, setSlide }: { setCardData: (cardData: PRONTOCardData) => void, setSlide: (slide: number) => void }) {
    return (
        <div className='flex justify-center items-center h-full'>
            <div>
                <h1 className='text-lg font-bold text-accent'>Where are you going #WithPRONTO?</h1>
                <button className='inline-block text-base cursor-pointer p-2 mt-3 border-2 bg-pronto font-medium text-xl rounded-xl' onClick={() => {
                    let cardDataInput = document.createElement('input');
                    cardDataInput.type = 'file';
                    cardDataInput.onchange = e => {
                        var file = (e.target as any)?.files[0];
                        var reader = new FileReader();
                        reader.readAsText(file, 'UTF-8');
                        reader.onload = readerEvent => {
                            if (readerEvent.target?.result) {
                                let parsedCardInfo = Papa.parse(readerEvent.target.result as string) as any
                                if (parsedCardInfo.errors.length > 0 || parsedCardInfo.data[0][5] !== "+/-") {
                                    alert('Please make sure that file\'s a valid CSV file from your Card History on RidePRONTO.com and try again.')
                                } else {
                                    let parsedCardEvents = parsedCardInfo.data.slice(1)
                                    let fareMediaSaleEvent = parsedCardEvents[parsedCardEvents.findIndex((row: string[]) => row[4] === "FareMediaSale")]

                                    let cardData: PRONTOCardData = {
                                        issuance: {
                                            date: fareMediaSaleEvent[0],
                                            time: fareMediaSaleEvent[1]
                                        },
                                        ridership: {
                                            bus: [],
                                            rail: 0,
                                            railtrolley: 0,
                                            railcoaster: 0,
                                            railsprinter: 0
                                        },
                                        stops: {
                                            bus: [],
                                            rail: []
                                        },
                                        checklists: {
                                            rapid: {
                                                '201': false,
                                                '204': false,
                                                '215': false,
                                                '225': false,
                                                '227': false,
                                                '235': false,
                                                '237': false,
                                            },
                                            scenics: {
                                                '398': false,
                                                '30': false,
                                                '84': false,
                                                '923': false,
                                                '225': false,
                                                '301': false,
                                                '308': false,
                                                '838': false,
                                                '901': false,
                                            },
                                            heart: {
                                                '201': false,
                                                '7': false,
                                                '13': false,
                                                '215': false,
                                                '235': false,
                                                '30': false,
                                                '929': false,
                                            }
                                        },
                                        boardings: parsedCardEvents.map((row: string[]) => {
                                            if (row[4] === "Boarding" || row[4] === "Transfer") {
                                                return {
                                                    timestamp: {
                                                        date: row[0],
                                                        time: row[1]
                                                    },
                                                    line: row[3].split(', ')[0].replace('Line: ', '').split(' ')[0].replace('202', '201'),
                                                    stop: row[3].split(', ')[1] ? row[3].split(', ')[1].replace('Stop: ', '').replace(' Station', '').replace(' Transit Center', '').replace('San Diego - ', '') : null,
                                                    transfer: row[4] === "Transfer"
                                                }
                                            }
                                        }).filter((boarding: PRONTOBoardingData | undefined) => boarding)
                                    }

                                    
                                    let ridesByLine: [string, number][] = [];

                                    let counts: { [route: string]: number } = {};
                                    cardData.boardings.forEach((boarding) => {
                                        if (boarding.line in counts) {
                                            counts[boarding.line]++;
                                        } else {
                                            counts[boarding.line] = 1;
                                            // @ts-ignore
                                            if (cardData.checklists.rapid[boarding.line] == false) {
                                                // @ts-ignore
                                                cardData.checklists.rapid[boarding.line] = true;
                                            }
                                            // @ts-ignore
                                            if (cardData.checklists.scenics[boarding.line] == false) {
                                                // @ts-ignore
                                                cardData.checklists.scenics[boarding.line] = true;
                                            }
                                            // @ts-ignore
                                            if (cardData.checklists.heart[boarding.line] == false) {
                                                // @ts-ignore
                                                cardData.checklists.heart[boarding.line] = true;
                                            }
                                        }
                                    });

                                    for (let route in counts) {
                                        ridesByLine.push([route, counts[route]]);
                                    }

                                    ridesByLine.sort((a, b) => b[1] - a[1]);
                                    console.log(ridesByLine);

                                    cardData.ridership.railtrolley = cardData.boardings.filter((boarding) => boarding.line === '599').length;
                                    cardData.ridership.railcoaster = cardData.boardings.filter((boarding) => boarding.line === '398').length;
                                    cardData.ridership.railsprinter = cardData.boardings.filter((boarding) => boarding.line === '399').length;

                                    cardData.ridership.rail = cardData.ridership.railtrolley + cardData.ridership.railcoaster + cardData.ridership.railsprinter;

                                    cardData.ridership.bus = ridesByLine.filter((route) => route[0] !== '599' && route[0] !== '398' && route[0] !== '399');

                                    let countByBusStop: { [stop: string]: number } = {};
                                    let countByRailStop: { [stop: string]: number } = {};

                                    cardData.boardings.forEach((boarding) => {
                                        if (boarding.stop && (boarding.line === '599' || boarding.line === '398' || boarding.line === '399')) {
                                            if (boarding.stop in countByRailStop) {
                                                countByRailStop[boarding.stop]++;
                                            } else {
                                                countByRailStop[boarding.stop] = 1;
                                            }
                                        } else if (boarding.stop) {
                                            if (boarding.stop in countByBusStop) {
                                                countByBusStop[boarding.stop]++;
                                            } else {
                                                countByBusStop[boarding.stop] = 1;
                                            }
                                        }
                                    });

                                    let ridesByBusStop: [string, number][] = [];
                                    let ridesByRailStop: [string, number][] = [];

                                    for (let stop in countByBusStop) {
                                        ridesByBusStop.push([stop, countByBusStop[stop]]);
                                    }

                                    for (let stop in countByRailStop) {
                                        ridesByRailStop.push([stop, countByRailStop[stop]]);
                                    }

                                    ridesByBusStop.sort((a, b) => b[1] - a[1]);
                                    ridesByRailStop.sort((a, b) => b[1] - a[1]);

                                    cardData.stops.bus = ridesByBusStop;
                                    cardData.stops.rail = ridesByRailStop;

                                    console.log(cardData);

                                    setCardData(cardData);
                                    setSlide(1);
                                }
                            }
                        }
                    }
                    cardDataInput.click();
                }}>Upload Card History</button>
            </div>
        </div>
    )
}