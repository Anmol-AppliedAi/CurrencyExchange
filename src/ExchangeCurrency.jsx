import React, { useState } from 'react';
import "./ExchangeCurrency.css";
const ExchangeCurrency = ({allCurrencies, selectedCurrencies, setSelectedCurrencies}) => {
    const [expanded, setExpanded ] = useState(false);
    const [currencyLength, setCurrencyLength] = useState(10); 
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
    const displayAllCurrencies = () => {
        const initialSelectedValues= [];
        const otherValues= [];
        Object.keys(allCurrencies)?.length > 0 && Object.keys(allCurrencies).forEach((currency)=> {
            const value = (<label htmlFor={currency} key={currency}>
              <input 
              type="checkbox" 
              id={currency} 
              checked={selectedCurrencies[currency]}
              value={currency}
              disabled={(!selectedCurrencies[currency] && Object.keys(selectedCurrencies).length > 6) ||
                (selectedCurrencies[currency] && Object.keys(selectedCurrencies).length < 4)}
              onChange={()=> {onChange(currency)}}
              />
              {allCurrencies[currency]}
            </label>);
            if(selectedCurrencies[currency]) initialSelectedValues.push(value);
            else otherValues.push(value);
        })
        return [...initialSelectedValues, ...otherValues].slice(0,currencyLength);
    }

    return (
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes} >
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes" style={{display: expanded ? "block": "none"}}>
            {displayAllCurrencies()}
            {currencyLength < Object.keys(allCurrencies).length && 
                <div className={"loader"} onClick={()=> setCurrencyLength(currencyLength+ 10)}>Load More</div>
            }
          </div>
        </div>
    );
};
export default ExchangeCurrency;
