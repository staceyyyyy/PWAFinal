export const checkJson = (string) => {
    try {
        JSON.parse(string);
        return true;
    } catch (error) {
        return false;
    }
};