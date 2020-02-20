import {default as fetch} from 'node-fetch'

async function main() {
    const tokens = [
        {name: 'USDC', price: 1.002}, 
        {name: 'TUSD', price: 1.005}
    ]

    for (const token of tokens) {
        const result = await fetch(`https://live-api.dex.ag/price?from=${token.name}&to=DAI&toAmount=2000&tradable=true&discluded=ddex,&ssr=false`)
        const kyber = (await result.json() as any[]).find(d => d.dex === 'kyber')

        if(Number(kyber.price) < token.price)
        await fetch(`https://maker.ifttt.com/trigger/price_alert/with/key/${process.env.IFTTT_KEY}`, 
        {
            method: 'POST', 
            body: JSON.stringify({
                value1: kyber.price,
                value2: token.name
            }),
            headers: {'Content-Type': 'application/json'}
        })
    }
}

main().catch(err => {
    throw err
})
