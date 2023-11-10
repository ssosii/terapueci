import prepareData from "./prepareData";

const useApi = () => {
    const fetch = async (
        endpoint,
        payload,
        method,
    ) => {
        if (typeof window.axios === 'undefined') {

            window.axios = await require('axios').default;
        }

        const response = await window.axios({
            url: endpoint,
            method: method,
            data: prepareData(payload),
        });

        if (!response.data || !response.data.status || response.data.status !== 'OK') {
            throw new Error(`(${response.data.code}) ${response.data.message}`);
        }

        return response.data;
    };

    return [fetch];
};

const useApiStatic = async (endpoint, payload, method) => {

    if (typeof window.axios === 'undefined') {

        window.axios = await require('axios').default;
    }

    const response = await window.axios({
        url: endpoint,
        method: method,
        data: prepareData(payload),
    });
    // if (!response.data || !response.data.status || response.data.status !== 'OK') {
    //     throw new Error(`(${response.data.code}) ${response.data.message}`);
    // }
    return response.data;
}

export default useApi;
export { useApiStatic };
