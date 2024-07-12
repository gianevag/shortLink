
export const createUrlFromObject = <T extends Object>(obj: T) => {
    const query = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
        if (value) {
            query.set(key, value.toString());
        }
    });
    return query.toString();
};