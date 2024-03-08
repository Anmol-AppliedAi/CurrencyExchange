export const defaultCurrencies = ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"];
export const dates = {
    initialDate: new Date().toISOString().split('T')[0],
    maxDate: new Date().toISOString().split('T')[0],
    minDate: new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
}; 