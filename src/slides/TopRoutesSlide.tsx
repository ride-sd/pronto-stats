import { RouteRender } from "../RouteRender";
import { PRONTOCardData } from "../types";
import { StopRender } from "../StopRender";

export function TopRoutesSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/mts-rapid_ibpier2.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            {cardData.ridership.bus.length === 1 && <h1 className='text-lg font-bold text-accent'>You've got a one-route mind.</h1>}
            {cardData.ridership.bus.length > 1 && <h1 className='text-lg font-bold text-accent'>You ride some good routes.</h1>}
            <p className="mt-3 text-base">
                Your favorite bus is <RouteRender line={cardData.ridership.bus[0][0]} />, which you've ridden <span className="text-gold font-bold">{cardData.ridership.bus[0][1]}</span> times. {cardData.ridership.bus.length > 1 && <>Here are some honorable mentions:</>}
            </p>
            <p className="my-6 text-base text-left">
                {cardData.ridership.bus.slice(1, 5).map(([line, count], index) => <span className="block my-1" key={line}><span className="text-accent font-medium">#{index + 2}</span> <RouteRender line={line} /> ({count} {count > 1 ? 'boardings' : 'boarding'})</span>)}
            </p>
            <p className="mt-3 text-base">
                Your favorite bus stop is <StopRender stop={cardData.stops.bus[0][0]} />, where you've boarded <span className="text-gold font-bold">{cardData.stops.bus[0][1]}</span> times.
            </p>
            {cardData.ridership.bus.length > 5 && <p className="mt-3 text-base">
                You also love to get out and explore the city, with <span className="text-gold font-bold">{cardData.ridership.bus.length}</span> unique routes ridden and <span className="text-gold font-bold">{cardData.stops.bus.length}</span> unique stops boarded at.
            </p>}
            {cardData.ridership.bus.length <= 5 && <p className="mt-3 text-base">
                You stick to your guns (or.. in this case.. your local routes), with only <span className="text-gold font-bold">{cardData.ridership.bus.length}</span> unique {cardData.ridership.bus.length == 1 ? 'route' : 'routes'} ridden.
            </p>}
        </div>  
    </>
}