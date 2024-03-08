import React, { useEffect, useState } from 'react';
import Network from './Network';
import './App.css';

const App = ()=> {
  const [defaultCurrency, setDefaultCurrency] = useState({});

  const displayDefaultCurrency = ()=> {
    return Object.keys(defaultCurrency).map((keyName, i) => (
        <option value={keyName}>{defaultCurrency[keyName]}</option>
    ))
  }

  const getAllCurrency= async ()=> {
    const resp = await Network.currenciesApi();
    if(Object.keys(resp).length > 0) {
      setDefaultCurrency(resp);
    }
  }
  
  useEffect(()=> {
    getAllCurrency();
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
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
