const BASE = "/api/secure/opendata?";

/**
 *
 * @param {{ select?: string; where?: string; group_by?: string; order_by?: string; limit?: number; offset?: number; refine?: string; exclude?: string; lang?: string; timezone?: string; }} params
 * @returns {Promise<any>}
 */
const sg = async (params) => {
    return await fetch(BASE + new URLSearchParams(params).toString()).then(
        (res) => res.json()
    );
};

export const getFaecher = () =>
    sg({
        where: `strukturtyp="Fach"`,
        limit: 100,
    });
