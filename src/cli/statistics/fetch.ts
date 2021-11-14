import fetch from 'node-fetch';

export const fetchPage = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        Promise.reject(error);
    }
}
