import React, { useEffect, useState } from 'react';
import Network from './Network';
import './App.css';

const App = ()=> {
  const [date, setDate] = useState("latest");
  const [currency, setCurrency] = useState("eur");
  const [defaultCurrency, setDefaultCurrency] = useState({});
  const [exchangeRates, setExchangeRates] = useState([]);
  const displayDefaultCurrency = ()=> {
    return Object.keys(defaultCurrency).map((keyName, i) => (
        <option value={keyName} key={keyName}>{defaultCurrency[keyName]} </option>
    ))
  }
  const displayCurrencyExchange = ()=> {
    return Object.keys(exchangeRates).map((keyName, i) => (
        <tr key={keyName}>
          <td>{keyName}</td>
          <td>{exchangeRates[keyName]}</td>
          <td>{date}</td>
        </tr>
    ))
  }

  const getAllCurrency= async (date)=> {
    const resp = await Network.currenciesApi();
    if(Object.keys(resp).length > 0) {
      setDefaultCurrency(resp);
    }
  }
  const getCurrencyExchange= async (date)=> {
    const resp = await Network.getCurrencyExchange();
    if(Object.keys(resp).length > 0) {
      setExchangeRates(resp?.[currency]);
      setDate(resp?.date);
    }
  }

  useEffect(()=> {
    getAllCurrency();
    getCurrencyExchange();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <label for="defaultCurrency">Default Currency</label>
        <select name="defaultCurrency" id="defaultCurrency">
          {displayDefaultCurrency()}
        </select>
        <label for="eCur">Exchange Currency</label>
        <input type="text" id="eCur" name="eCur"/>
      </header>
      <h2>Exchange Rates</h2>
      <table>
        <tr>
          <th>Currency</th>
          <th>Exchange Rate</th>
          <th>Date</th>
        </tr>
        {displayCurrencyExchange()}
      </table>
    </div>
  );
}

export default App;
