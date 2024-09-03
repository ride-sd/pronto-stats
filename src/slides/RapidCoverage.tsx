import { RouteRender } from "../RouteRender";
import { PRONTOCardData } from "../types";

export function RapidCoverageSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/mts-rapid_downtown.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            <h1 className='text-lg font-bold text-accent'>You sure like to ride in style.</h1>
            <p className="mt-3 text-base">
                Here's how you've been getting around town on the <i>Rapid</i> network:
            </p>
            <p className="mt-3 text-base">
                {Object.keys(cardData.checklists.rapid).map(route => {
                    // @ts-ignore
                    if (cardData.checklists.rapid[route]) {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ✅</span>
                    } else {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ❌</span>
                    }
                })}
            </p>
        </div>
    </>
}