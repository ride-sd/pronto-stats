import { PRONTOCardData } from "../types";

export function CardIssuanceSlide({ cardData }: { cardData: PRONTOCardData }) {
    return <>
        <img src="/mtstrolley-missionbay2.jpg" className="h-[20vh] w-full object-cover" />
        <div className="p-8">
            <h1 className='text-lg font-bold text-accent'>{
                (cardData.issuance.date.startsWith('9') || cardData.issuance.date.startsWith('8')) && cardData.issuance.date.endsWith('2021') ? 'You\'ve been going with PRONTO since the beginning!' : cardData.issuance.date.endsWith(new Date().getFullYear().toString()) ? 'Looks like you\'re new here! Welcome aboard!' : `You\'ve been going with PRONTO since ${cardData.issuance.date.split('/')[2]}!`
            }</h1>
            <p className="mt-3 text-base">
                Your PRONTO card was issued on <span className="text-gold font-bold">{cardData.issuance.date}</span>{(cardData.issuance.date.startsWith('9') || cardData.issuance.date.startsWith('8')) && cardData.issuance.date.endsWith('2021') ? (cardData.issuance.date.startsWith('8') ? ', before PRONTO launched to the public. You\'re a certified transit VIP!' : ', during the first month of PRONTO! Time sure flies when you\'re having fun.') : ` at exactly ${cardData.issuance.time}. Save that date for the history books.`}
            </p>
            <p className="mt-3 text-base">
            Since then, you've taken <span className="text-gold font-bold">{cardData.boardings.length}</span> transit rides!{cardData.boardings.length > 130 && <> If you rode just the Downtown Loop that often, you'd have gone enough miles to ride the full <i>Pacific Surfliner</i> {Math.floor((cardData.boardings.length * 2.7) / 350)} times!</>}
            </p>
        </div>
    </>
}