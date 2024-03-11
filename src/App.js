import React, { useEffect, useState } from 'react';
import Network from './Network/Network';
import ExchangeCurrency from './ExchangeCurrency/ExchangeCurrency';
import { defaultCurrencies, dates } from "./Constant";
import './App.css';

const App = ()=> {
  const {initialDate, maxDate, minDate} = dates;
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currency, setCurrency] = useState("eur");
  const [allCurrencies, setAllCurrencies] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState({});
  const [selectedDisplayCurrencies, setDisplaySelectedCurrencies] = useState({});
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
    return Object.keys(defaultCurrency).length> 0 && Object.keys(defaultCurrency).reduce((accumulator, keyName) => {
        const val = (<option value={keyName} key={keyName} >{defaultCurrency[keyName]} </option>);
        if(defaultCurrency[keyName]) accumulator.push(val);
        return accumulator;
  },[])
  };
  const displayCurrencyExchange = ()=> {
    const filteredExchangeRates = {};
    Object.keys(selectedDisplayCurrencies).forEach((currency)=> {
      if(exchangeRates[currency]){
        filteredExchangeRates[currency] = exchangeRates[currency];
      }
    })
    return Object.keys(filteredExchangeRates).map((keyName) => (
        <tr key={keyName}>
          <td>{selectedDisplayCurrencies[keyName]}</td>
          <td>{exchangeRates[keyName]}</td>
          <td>{selectedDate}</td>
        </tr>
    ))
  }

  const getAllCurrency= async ()=> {
    setLoader(true);
    const resp = await Network.currenciesApi(date);
    setLoader(false);
    if(resp && Object.keys(resp).length > 0) {
      setDefaultCurrency(resp);
      setAllCurrencies(resp);
    }
    else {
      setDefaultCurrency({});
    }
  }

  const getCurrencyExchange= async ()=> {
    setLoader(true);
    const resp = await Network.getCurrencyExchange(date,currency);
    setLoader(false);
    if(resp && Object.keys(resp).length > 0) {
      setExchangeRates(resp?.[currency]);
      setDate(resp?.date);
    }
    else {
      setExchangeRates({});
    }
  }
  const getDetails = async ()=> {
    await getCurrencyExchange();
    setDisplaySelectedCurrencies(selectedCurrencies);
    setSelectedDate(date);
  }
  
  const setInitialCurrencies = ()=> {
    const selectCurrency = {};
    defaultCurrencies.forEach((defaultCurrency)=> {
      if(allCurrencies[defaultCurrency]){
        selectCurrency[defaultCurrency] = allCurrencies[defaultCurrency];
      }
    })
    setSelectedCurrencies(selectCurrency);
    setDisplaySelectedCurrencies(selectCurrency);
  }
  const removeSelectedItems = (currency)=> {
    const newSelectedCurrencies = {...selectedCurrencies};
    delete newSelectedCurrencies[currency];
    setSelectedCurrencies(newSelectedCurrencies)
}
  const displaySelectedValues = ()=> {
    return Object.keys(selectedCurrencies).map((currency)=> (
            <span key={currency}>
                {selectedCurrencies[currency]}
                <button onClick={()=>{removeSelectedItems(currency)}} disabled={Object.keys(selectedCurrencies).length < 4}>X</button>
            </span>
    ));
}

  useEffect(()=> {
    getAllCurrency();
    getCurrencyExchange();
    
  },[]);

  useEffect(()=> {
    setInitialCurrencies();
    return ()=>{
      setInitialCurrencies();
    }
  },[allCurrencies]);

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="defaultCurrency">Default Currency</label>
        <label htmlFor="exchangeCurrency">Exchange Currencies</label>
        <label htmlFor="date">Exchange Date</label>
        <select name="defaultCurrency" id="defaultCurrency" value={currency} onChange={onCurrencyChange}>
          {displayDefaultCurrency()}
        </select>
        <ExchangeCurrency 
          allCurrencies={allCurrencies} 
          selectedCurrencies={selectedCurrencies} 
          setSelectedCurrencies={setSelectedCurrencies}
        /> 
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={date} 
          onChange={onDateChange}
          max={maxDate}
          min={minDate}
        />
        <div></div>
        <div className='selectedValues'>
            {displaySelectedValues()}
        </div>
        <div className='divCenter'><button className='button' onClick={getDetails}>Get Exchange Rate</button></div>
        
        
      </header>
      <h2>Exchange Rates</h2>
      {loader && <div id="loader" class="loader"></div>}
      {Object.keys(exchangeRates)?.length > 0 ? <table>
        <tr>
          <th>Currency</th>
          <th>Exchange Rate</th>
          <th>Date</th>
        </tr>
        {displayCurrencyExchange()}
      </table>: <span>No Records Found</span>}
    </div>
  );
}

export default App;
