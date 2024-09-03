import { useState } from "react";
import ParseCard from "./ParseCard";
import type { PRONTOCardData, PRONTOBoardingData } from "./types";
import { CardIssuanceSlide } from "./slides/CardIssuanceSlide";
import { TopRoutesSlide } from "./slides/TopRoutesSlide";
import { RailRoutesSlide } from "./slides/RailRoutesSlide";
import { RapidCoverageSlide } from "./slides/RapidCoverage";
import { ScenicCoverageSlide } from "./slides/ScenicCoverage";
import { HeartCoverageSlide } from "./slides/HeartCoverage";
import { FinalSlide } from "./slides/FinalSlide";

export default function StateManager() {
    let [cardData, setCardData] = useState<PRONTOCardData>();
    let [slide, setSlide] = useState<number>(0);

    return (<>
        {!cardData && <ParseCard setCardData={setCardData} setSlide={setSlide} />}
        {cardData && <>
            <button className="m-2 bg-pronto p-1 rounded-lg w-[10%] fixed top-0 left-0 z-40" onClick={() => {
                if (slide > 1) {
                    setSlide(slide - 1);
                } else {
                    if (confirm('Are you sure you want to reset?')) {
                        setSlide(0);
                        setCardData(undefined);
                    }
                }
            }}>&larr;</button>
            {slide !== 7 && <button className="m-2 bg-pronto p-1 rounded-lg w-[10%] fixed top-0 right-0 z-40" onClick={() => {
                if (slide >= 1) {
                    if ((slide === 1 && cardData.ridership.bus.length === 0) || (slide === 2 && cardData.ridership.rail === 0)) {
                        setSlide(slide + 2);
                    } else {
                        setSlide(slide + 1);
                    }
                }
            }}>&rarr;</button>}
            {slide === 1 && <CardIssuanceSlide cardData={cardData} />}
            {slide === 2 && <TopRoutesSlide cardData={cardData} />}
            {slide === 3 && <RailRoutesSlide cardData={cardData} />}
            {slide === 4 && <RapidCoverageSlide cardData={cardData} />}
            {slide === 5 && <ScenicCoverageSlide cardData={cardData} />}
            {slide === 6 && <HeartCoverageSlide cardData={cardData} />}
            {slide === 7 && <FinalSlide cardData={cardData} />}
        </>}
    </>)
}