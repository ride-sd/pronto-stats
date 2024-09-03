import { RouteRender } from "../RouteRender";
import { PRONTOCardData } from "../types";

export function ScenicCoverageSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/nctd-carlsbad.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            <h1 className='text-lg font-bold text-accent'>You appreciate a good view.</h1>
            <p className="mt-3 text-base">
                Here's how many of the most scenic transit routes you've ridden:
            </p>
            <p className="mt-3 text-base">
                {Object.keys(cardData.checklists.scenics).map(route => {
                    // @ts-ignore
                    if (cardData.checklists.scenics[route]) {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ✅</span>
                    } else {
                        return <span className="block my-1" key={route}><RouteRender line={route} /> ❌</span>
                    }
                })}
            </p>
        </div>
    </>
}