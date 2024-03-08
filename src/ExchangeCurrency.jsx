import React, { useRef, useState } from 'react';
import "./ExchangeCurrency.css";
const ExchangeCurrency = ({allCurrencies, selectedCurrencies, setSelectedCurrencies}) => {
    const [expanded, setExpanded ] = useState(false);
    const checkboxRef= useRef(null);
    const showCheckboxes= ()=> {
        setExpanded(!expanded);
    }
    const onChange = (currency) => {
        if(selectedCurrencies[currency]) {
            const newSelectedCurrencies = {...selectedCurrencies};
            delete newSelectedCurrencies[currency];
            setSelectedCurrencies(newSelectedCurrencies)
        } else {
            setSelectedCurrencies({...selectedCurrencies, [currency] : allCurrencies[currency]});
        }

    }
    const displayallCurrencies = () => {
        return Object.keys(allCurrencies)?.length > 0 && Object.keys(allCurrencies).map((currency)=> (
            <label htmlFor={currency} key={currency}>
              <input 
              type="checkbox" 
              id={currency} 
              checked={selectedCurrencies[currency]}
              value={currency}
              onChange={()=> {onChange(currency)}}
              />
              {allCurrencies[currency]}
            </label>
        ))
    }

    return (
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes} ref={checkboxRef} >
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes" style={{display: expanded ? "block": "none"}}>
            {displayallCurrencies()}
          </div>
        </div>
    );
};
export default ExchangeCurrency;
