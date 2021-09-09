import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const crypto = {
  '1INCH': '1inch',
  'AAVE': 'aave',
  'ADX': 'adex',
  'AKRO': 'akropolis',
  'ALICE': 'my-neighbor-alice',
  'ALPHA': 'alpha-finance',
  'ANT': 'aragon',
  'ANKR': 'ankr',
  'APPC': 'appcoins',
  'AST': 'airswap',
  'AUDIO': 'audius',
  'AXS': 'axie-infinity',
  'BAL': 'balancer',
  'BAND': 'band-protocol',
  'BAT': 'basic-attention-token',
  'BNT': 'bancor',
  'BQX': 'ethos',
  'BRD': 'bread',
  'BTC': 'bitcoin',
  'BTM': 'bytom',
  'BZRX': 'bzx-protocol',
  'CELR': 'celer-network',
  'CHR': 'chromaway',
  'CHZ': 'chiliz',
  'CND': 'cindicator',
  'COMP': 'compound-governance-token',
  'CRO': 'crypto-com-chain',
  'CRV': 'curve-dao-token',
  'CTSI': 'cartesi',
  'DEGO': 'dego-finance',
  'DENT': 'dent',
  'DIA': 'dia-data',
  'DLT': 'agrello',
  'DOCK': 'dock',
  'DODO': 'dodo',
  'ENJ': 'enjincoin',
  'ETH': 'ethereum',
  'EVX': 'everex',
  'FET': 'fetch-ai',
  'FIS': 'stafi',
  'FTM': 'fantom',
  'GLM': 'golem',
  'GRT': 'the-graph',
  'GTO': 'gifto',
  'HOT': 'holotoken',
  'HT': 'huobi-token',
  'ICE': 'ice-token',
  'INJ': 'injective-protocol',
  'KNC': 'kyber-network',
  'LINA': 'linear',
  'LIT': 'litentry',
  'LEO': 'leo-token',
  'LINK': 'chainlink',
  'LRC': 'loopring',
  'MANA': 'decentraland',
  'MATIC': 'matic-network',
  'MITH': 'mithril',
  'MKR': 'maker',
  'MTH': 'monetha',
  'NEST': 'nest',
  'NEXO': 'nexo',
  'NKN': 'nkn',
  'NMR': 'numeraire',
  'OAX': 'openanx',
  'OCEAN': 'ocean-protocol',
  'OGN': 'origin-protocol',
  'OMG': 'omisego',
  'OST': 'simple-token',
  'OXT': 'orchid-protocol',
  'PAXG': 'pax-gold',
  'PNT': 'pnetwork',
  'POLY': 'polymath',
  'POND': 'marlin',
  'POWR': 'power-ledger',
  'PUNDIX': 'pundi-x-2',
  'REN': 'republic-protocol',
  'REEF': 'reef-finance',
  'RLC': 'iexec-rlc',
  'RSR': 'reserve-rights-token',
  'SAND': 'the-sandbox',
  'SNM': 'sonm',
  'SNX': 'havven',
  'SOC': 'all-sports',
  'SRM': 'serum',
  'STMX': 'storm',
  'STORJ': 'storj',
  'SUSHI': 'sushi',
  'SXP': 'swipe',
  'TRB': 'tellor',
  'TRU': 'truefi',
  'UMA': 'uma',
  'UNI': 'uniswap',
  'UOP': 'utopia-genesis-foundation',
  'VALUE': 'value-liquidity',
  'WABI': 'wabi',
  'wBTC': 'wrapped-bitcoin',
  'YFI': 'yearn-finance',
  'YFII': 'yfii-finance',
  'ZRX': '0x'
}


const cryptoNames = Object.values(crypto)
const tickers = Object.keys(crypto)
const days = 7


const urlCrypto = (crypto) => {
  let cryptoArr = []
  for(let i=0; i<cryptoNames.length; i++){
    //cryptoArr.push(axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoNames[i]}/market_chart?vs_currency=usd&days=${days}&interval=daily`))
    cryptoArr.push(`https://api.coingecko.com/api/v3/coins/${cryptoNames[i]}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
  }
  return cryptoArr
}
const url = urlCrypto(crypto)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/*
// calculate vol
let retArr = {} 

Object.keys(newObj).map(function(key, index){
    console.log(key, newObj[key])
    retArr[key] = newObj[key].reduce((a,b)=>a+b)/newObj[key].length
})  
console.log('retArr', retArr)
*/

function App() {

  const [coins, setCoins] = useState({ data: [] })

  const fetchUrl = async (url, index) => {
    let priceArray = []
    let coinObj = {}
    return await axios.get(url).then((response) => {
      const prices = response.data.prices;
      for (let i=0; i<prices.length; i++){
        priceArray.push(prices[i][1])
      }
      coinObj.symbol = tickers[index]
      coinObj.prices = priceArray
      return coinObj
    })
  }

  const fetchData = () => {
    (async () => {
      let arrayQ = [];
      for (let i=0; i<url.length; i++){
        await delay(800);
        await fetchUrl(url[i], i).then((coinObj) => {
          arrayQ.push(coinObj);
          setCoins({ data: [...data, coinObj] });
        })
        setCoins({ data: [...arrayQ] })
      }
    })()
  }
 
  useEffect(()=>{                                                                                                                     
      fetchData();                                                                                                                        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);                                                                                                                                

  const {data} = coins

  return (
    <div className="coin-app">
      <table className="coin-table"> 
        <thead>
        <tr>
          <th style={{width:'50px'}}>Symbol</th>
          <th style={{width:'150px'}}>T-8</th>
          <th style={{width:'150px'}}>T-7</th>
          <th style={{width:'150px'}}>T-6</th>
          <th style={{width:'150px'}}>T-5</th>
          <th style={{width:'150px'}}>T-4</th>
          <th style={{width:'150px'}}>T-3</th>
          <th style={{width:'150px'}}>T-2</th>
          <th style={{width:'150px'}}>T-1</th>
        </tr>
        </thead>
      <tbody>
        {data.map(function (coin, index) {
          return (
            <tr key={coin.symbol}>
              <td>{coin.symbol}</td>
              {coin.prices.map((price, index) => {
                return <td key={index}>{price}</td>
              })}
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  );
}

export default App;
