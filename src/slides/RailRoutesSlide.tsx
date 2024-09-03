import { RouteRender } from "../RouteRender";
import { StopRender } from "../StopRender";
import { PRONTOCardData } from "../types";

export function RailRoutesSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/mts-trolley_snapdragonstadium.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            <h1 className='text-lg font-bold text-accent'>You've got a taste for the rails.</h1>
            <p className="mt-3 text-base">
                You've {cardData.ridership.bus.length > 0 ? ' also ' : ''}taken <span className="text-gold font-bold">{cardData.ridership.rail}</span> train rides! That's {cardData.ridership.railtrolley} on the <RouteRender line="599" />, {cardData.ridership.railcoaster} on the <RouteRender line="398" />, and {cardData.ridership.railsprinter} on the humble <RouteRender line="399" />.
            </p>
            <p className="mt-3 text-base">
                Your favorite train station is <StopRender stop={cardData.stops.rail[0][0]} />, where you boarded or transferred <span className="text-gold font-bold">{cardData.stops.rail[0][1]}</span> times. {cardData.stops.rail.length > 1 && <>Here are some other stations you frequent:</>}
            </p>

            <p className="mt-6 text-base text-left">
                {cardData.stops.rail.slice(1, 5).map(([stop, count], index) => <span className="block my-1" key={stop}><span className="text-accent font-medium">#{index + 2}</span> <StopRender stop={stop} /> ({count} {count > 1 ? 'boardings' : 'boarding'})</span>)}
            </p>
        </div>  
    </>
}