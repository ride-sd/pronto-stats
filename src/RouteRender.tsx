const lineColors = {
    '201': '#E85D98',
    '202': '#E85D98',
    '204': '#E85D98',
    '215': '#3BC0E1',
    '225': '#293490',
    '227': '#7BC24D',
    '235': '#EE2D24',
    '237': '#602985',
}

export function RouteRender({ line }: { line: string }) {
    return <span className="px-2 rounded-md font-medium whitespace-nowrap" style={{
        // @ts-ignore
        background: (line.startsWith('3') && line.length === 3) ? '#00459D' : lineColors[line] || '#EE2D24' 
    }}>
        {line === '599' && <>
            <img src="/icon-trolley.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top">Trolley</span>
        </>}
        {line === '398' && <>
            <img src="/icon-coaster.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top">COASTER</span>
        </>}
        {line === '399' && <>
            <img src="/icon-sprinter.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top">SPRINTER</span>
        </>}
        {line === '201' && <>
            <img src="/icon-bus.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top"><i>SuperLoop</i> 201/202</span>
        </>}
        {line === '204' && <>
            <img src="/icon-bus.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top"><i>SuperLoop</i> 204</span>
        </>}
        {line !== '599' && line !== '398' && line !== '399' && line !== '201' && line !== '204' && <>
            <img src="/icon-bus.svg" className="inline-block mr-2 h-[1.2rem] align-middle -translate-y-0.5" />
            <span className="align-top">{line.startsWith('2') && line.length === 3 ? <i>Rapid</i> : 'Route'} {line.replace('301', '101')}</span>
        </>}
    </span>
}