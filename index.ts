import {default as fetch} from 'node-fetch'

async function main() {
    const result = await fetch('https://live-api.dex.ag/price?from=TUSD&to=DAI&toAmount=2000&tradable=true&discluded=ddex,&ssr=false')
    const kyber = (await result.json() as any[]).find(d => d.dex === 'kyber')

    if(Number(kyber.price) < 1.08)
        console.log(kyber.price)
}

main()