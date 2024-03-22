const BASE = "/api/secure/opendata?";

/**
 * St. Gallen - The function
 * @param {{ select?: string; where?: string; group_by?: string; order_by?: string; limit?: number; offset?: number; refine?: string; exclude?: string; lang?: string; timezone?: string; }} params
 * @returns {Promise<any>}
 */
const sg = async (params) => {
    return await fetch(BASE + new URLSearchParams(params).toString()).then(
        (res) => res.json()
    );
};

export const getFachbereiche = (limit, offset) =>
    sg({
        where: `strukturtyp="Fachbereich"`,
        limit: 100,
    });

export const getFaecherByFachbereich = (fbId) =>
    sg({
        where: `strukturtyp="Fach" and fb_id=${fbId}`,
        limit: 100,
    });

export const getKompetenzbereicheByFach = (fbId, fachId) =>
    sg({
        where: `strukturtyp="Kompetenzbereich" and fb_id=${fbId} and f_id=${fachId}`,
        limit: 100,
    });

export const getThemenaspekteByKompetenzbereich = (fbId, fachId, kbId) =>
    sg({
        where: `strukturtyp="Handlungs-/Themenaspekt" and fb_id=${fbId} and f_id=${fachId} and kb_id=${kbId}`,
        limit: 100,
    });

export const getAufbauByThemenaspekt = (fbId, fachId, kbId, haId) =>
    sg({
        where: `strukturtyp="Aufbau" and fb_id=${fbId} and f_id=${fachId} and kb_id=${kbId} and ha_id=${haId}`,
        limit: 100,
    });

export const getKompetenzenByAufbau = (fbId, fachId, kbId, haId, aufbauId) =>
    sg({
        where: `strukturtyp="Kompetenz" and fb_id=${fbId} and f_id=${fachId} and kb_id=${kbId} and ha_id=${haId} and ${
            aufbauId == null ? "aufbau is null" : `aufbau=${aufbauId}`
        }`,
        limit: 100,
    });

export const getKompetenzstufenByKompetenz = (
    fbId,
    fachId,
    kbId,
    haId,
    aufbauId,
    kompetenzId
) =>
    sg({
        where: `strukturtyp="Kompetenzstufe" and fb_id=${fbId} and f_id=${fachId} and kb_id=${kbId} and ha_id=${haId} and ${
            aufbauId == null ? "aufbau is null" : `aufbau=${aufbauId}`
        } and k_id=${kompetenzId}`,
        limit: 100,
    });

export const getAufzaehlungspunkteByKompetenzstufe = (
    fbId,
    fachId,
    kbId,
    haId,
    aufbauId,
    kompetenzId,
    kId
) =>
    sg({
        where: `strukturtyp="Aufzaehlungspunkt" and fb_id=${fbId} and f_id=${fachId} and kb_id=${kbId} and ha_id=${haId} and aufbau=${aufbauId} and k_id=${kompetenzId} and ks_id=${kId}`,
        limit: 100,
    });
