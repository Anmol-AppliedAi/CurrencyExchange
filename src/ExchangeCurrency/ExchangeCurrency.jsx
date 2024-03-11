import React, { useRef, useState, useEffect } from 'react';
import "./ExchangeCurrency.css";

const ExchangeCurrency = ({allCurrencies, selectedCurrencies, setSelectedCurrencies}) => {
    const [expanded, setExpanded ] = useState(false);
    const checkBoxRef = useRef(null);
    const showCheckboxes= ()=> {setExpanded(!expanded)};

    const onChange = (currency) => {
        if(selectedCurrencies[currency]) {
            const newSelectedCurrencies = {...selectedCurrencies};
            delete newSelectedCurrencies[currency];
            setSelectedCurrencies(newSelectedCurrencies)
        } else {
            setSelectedCurrencies({...selectedCurrencies, [currency] : allCurrencies[currency]});
        }
    }
    const removeSelectedItems = (currency)=> {
        const newSelectedCurrencies = {...selectedCurrencies};
        delete newSelectedCurrencies[currency];
        setSelectedCurrencies(newSelectedCurrencies)
    }
    const displayAllCurrencies = () => {
        const displayValues= [];
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
            if(allCurrencies[currency]) displayValues.push(value);
        })
        return [...displayValues];
    }
    const displaySelectedValues = ()=> {
        return Object.keys(selectedCurrencies).map((currency)=> (
                <span key={currency}>
                    {selectedCurrencies[currency]}
                    <button onClick={()=>{removeSelectedItems(currency)}}>X</button>
                </span>
        ));
    }
    const handleOutsideClick = (e) => {
        if (checkBoxRef.current && !checkBoxRef.current.contains(e.target)) {
            setExpanded(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });
    return (
        <div id="multiselect" ref={checkBoxRef}>
          <div className="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
            { expanded && 
                <div id="checkboxes">
                    {displayAllCurrencies()}
                </div>
            }
            <div className='selectedValues'>
                {displaySelectedValues()}
            </div>
        </div>
    );
};
export default ExchangeCurrency;
