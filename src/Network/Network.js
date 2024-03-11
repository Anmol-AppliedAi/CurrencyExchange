const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/";

const getApiCall = async (params) => {
    const url = baseUrl + params;
    const resp = await fetch(url);
    if(resp.status == 200) {
        return resp.json();
    }
    return;

} 

const currenciesApi = async (date="latest") => {
    const params = `currency-api@${date}/v1/currencies.json`;
    const resp = await getApiCall(params);
    return resp;
}
const getCurrencyExchange = async (date="latest", currency="eur") => {
    const params = `currency-api@${date}/v1/currencies/${currency}.json`;
    const resp = await getApiCall(params);
    return resp;
}

const Network = {
    currenciesApi,
    getCurrencyExchange
};
export default Network;
