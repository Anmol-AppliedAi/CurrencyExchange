import React, { useEffect, useState } from 'react';
import Network from './Network';
import ExchangeCurrency from './ExchangeCurrency';
import './App.css';
const defaultCurrencies = ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"];
const App = ()=> {
  const dates = {
    initialDate: new Date().toISOString().split('T')[0],
    maxDate: new Date().toISOString().split('T')[0],
    minDate: new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
  }
  const [date, setDate] = useState(dates.initialDate);
  const [currency, setCurrency] = useState("eur");
  const [allCurrencies, setAllCurrencies] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState({});
  const [defaultCurrency, setDefaultCurrency] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});
  const onCurrencyChange = (event) => {
    const curencyVal = event.target.value;
    setCurrency(curencyVal);
  }
  const onDateChange = (event) => {
    const curencyVal = event?.target?.value;
    if(curencyVal != date) setDate(curencyVal);
  }
  const displayDefaultCurrency = ()=> {
    return Object.keys(defaultCurrency).length> 0 && Object.keys(defaultCurrency).map((keyName, i) => (
        <option value={keyName} key={keyName} >{defaultCurrency[keyName]} </option>
    ))
  };
  const displayCurrencyExchange = ()=> {
    const filteredExchangeRates = {};
    Object.keys(selectedCurrencies).forEach((currency)=> {
      if(exchangeRates[currency]){
        filteredExchangeRates[currency] = exchangeRates[currency];
      }
    })
    return Object.keys(filteredExchangeRates).map((keyName) => (
        <tr key={keyName}>
          <td>{selectedCurrencies[keyName]}</td>
          <td>{exchangeRates[keyName]}</td>
          <td>{date}</td>
        </tr>
    ))
  }

  const getAllCurrency= async ()=> {
    const resp = await Network.currenciesApi(date);
    if(Object.keys(resp).length > 0) {
      setDefaultCurrency(resp);
      setAllCurrencies(resp);
    }
  }

  const getCurrencyExchange= async ()=> {
    const resp = await Network.getCurrencyExchange(date,currency);
    if(Object.keys(resp).length > 0) {
      setExchangeRates(resp?.[currency]);
      setDate(resp?.date);
    }
  }
  
  const setInitialCurrencies = ()=> {
    const selectCurrency = {};
    defaultCurrencies.forEach((defaultCurrency)=> {
      if(allCurrencies[defaultCurrency]){
        selectCurrency[defaultCurrency] = allCurrencies[defaultCurrency];
      }
    })
    setSelectedCurrencies(selectCurrency);
  }

  useEffect(()=> {
    getAllCurrency();
    getCurrencyExchange();
  },[currency, date]);

  useEffect(()=> {
    setInitialCurrencies();
    return ()=>{
      setInitialCurrencies();
    }
  },[allCurrencies]);

  return (
    <div className="App">
      <header className="App-header">
        <label for="defaultCurrency">Default Currency</label>
        <select name="defaultCurrency" id="defaultCurrency" value={currency} onChange={onCurrencyChange}>
          {displayDefaultCurrency()}
        </select>
        <label for="date">Exchange Date</label>
        <input 
        type="date" 
        id="date" 
        name="date" 
        value={date} 
        onChange={onDateChange}
        max={dates.maxDate}
        min={dates.minDate}
        />
        <label for="exchangeCurrency">Exchange Currencies</label>
        <ExchangeCurrency 
          allCurrencies={allCurrencies} 
          selectedCurrencies={selectedCurrencies} 
          setSelectedCurrencies={setSelectedCurrencies}
        />
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
