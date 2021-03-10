import React, {useState, useEffect} from 'react';
import axios from 'axios';

const crypto = {
  'STORJ': 'storj',
  'SUSHI': 'sushi',
  'SXP': 'swipe',
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
const days = 7


const urlCrypto = (crypto) => {
  let cryptoArr = []
  for(let i=0; i<cryptoNames.length; i++){
    cryptoArr.push(axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoNames[i]}/market_chart?vs_currency=usd&days=${days}&interval=daily`))
  }
  return cryptoArr
}
const url = urlCrypto(crypto)
const tickers = Object.keys(crypto)


function Hack() {

  const [coins, setCoins] = useState({})

  const fetchData = async () => {                                                                                                     
          await axios                                                                                                                     
          .all(url)                                                                                                              
          //.get(`https://api.coingecko.com/api/v3/coins/${cryptoNames[names]}/market_chart?vs_currency=usd&days=${days}&interval=daily`) 
          .then(axios.spread((...u)=>{                                                                                                    
                                                                                                                                          
          let objU = {}                                                                                                                   
          let chunk =days+1                                                                                                               
          let newObj = {}                                                                                                                 
          let allPrices = []                                                                                                              
          let splitPrices = []                                                                                                            
                                                                                                                                          
          for(let i=0; i<url.length; i++){                                                                                       
            objU[tickers[i]] = u[i].data.prices                                                                                           
          }                                                                                                                               
                                                                                                                                          
          for (let line in objU){                                                                                                         
            for (let k=0; k<chunk; k++){                                                                                                  
              allPrices.push(objU[line][k][1])                                                                                            
            }                                                                                                                             
          }                                                                                                                               
                                                                                                                                          
          for (let i=0; i<allPrices.length; i+=chunk){                                                                                    
            splitPrices.push(allPrices.slice(i,i+chunk))                                                                                  
          }                                                                                                                               
                                                                                                                                          
          for (let j=0; j<splitPrices.length; j++){                                                                                       
              newObj[tickers[j]] = splitPrices[j]                                                                                         
          }                                                                                                                               
          setCoins(newObj)                                                                                                                
        }))                                                                                                                               
          .catch(error=>console.error(error)) 
  }

    
  useEffect(()=>{                                                                                                                     
      fetchData();                                                                                                                        
    },[]);                                                                                                                                
    console.log('coins', coins)                                                                                                           


  return (
    <div className="coin-app">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>T-8</th>
          <th>T-7</th>
          <th>T-6</th>
          <th>T-5</th>
          <th>T-4</th>
          <th>T-3</th>
          <th>T-2</th>
          <th>T-1</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(coins).map(function(key, index){
          return(
            <tr key={key}>
              <td>{key}</td>
              <td>{coins[key][0]}</td>
              <td>{coins[key][1]}</td>
              <td>{coins[key][2]}</td>
              <td>{coins[key][3]}</td>
              <td>{coins[key][4]}</td>
              <td>{coins[key][5]}</td>
              <td>{coins[key][6]}</td>
              <td>{coins[key][7]}</td>
            </tr>
          )  
        })}
      </tbody>
      </div>
  );
}

export default Hack;
