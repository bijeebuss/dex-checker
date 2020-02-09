import {default as fetch} from 'node-fetch'

async function main() {
    const result = await fetch('https://live-api.dex.ag/price?from=TUSD&to=DAI&toAmount=2000&tradable=true&discluded=ddex,&ssr=false')
    const kyber = (await result.json() as any[]).find(d => d.dex === 'kyber')

    if(Number(kyber.price) < 1.1)
    await fetch(`https://maker.ifttt.com/trigger/price_alert/with/key/${process.env.IFTTT_KEY}`, 
    {
        method: 'POST', 
        body: JSON.stringify({
            value1: kyber.price
        }),
        headers: {'Content-Type': 'application/json'}
    })

}

main().catch(err => {
    throw err
})