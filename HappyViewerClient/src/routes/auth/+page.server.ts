import { DB_KEY, DB_URL } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export const load = () => {
    return {
        url: DB_URL,
        key: DB_KEY,
    };
}