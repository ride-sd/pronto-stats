import { RouteRender } from "../RouteRender";
import { PRONTOCardData } from "../types";

export function HeartCoverageSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/mts-rapid_downtown.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            <h1 className='text-lg font-bold text-accent'>You go where the city is.</h1>
            <p className="mt-3 text-base">
                Here's how many of the most popular MTS routes you've ridden (1+ million total boardings a year):
            </p>
            <p className="mt-3 text-base">
                {Object.keys(cardData.checklists.heart).map(route => {
                    // @ts-ignore
                    if (cardData.checklists.heart[route]) {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ✅</span>
                    } else {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ❌</span>
                    }
                })}
            </p>
        </div>
    </>
}