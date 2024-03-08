const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/";

const getApiCall = async (params) => {
    const url = baseUrl + params;
    return (await fetch(url)).json();
} 

const currenciesApi = async (date="latest") => {
    const params = `currency-api@${date}/v1/currencies.json`;
    const resp = await getApiCall(params);
    return resp;
}

const Network = {
    currenciesApi
};
export default Network;
