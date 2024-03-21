import Keycloak from "@auth/core/providers/keycloak";

const KeycloakProvider = Keycloak({
    name: "keycloak",
    issuer: "http://localhost:8080/realms/schaeppli",
    clientId: "schaeppli",
    // WHEN DEPLOYING: Replace these with environment variables
    // Just here because we don't have the time for HTTPS / keycloak prod
    clientSecret: "KtFJ4RsghKYpbTSIRo48SJPxDwMrNs1n",
    // authorization: "http://localhost:8080/realms/master/protocol/openid-connect/auth",
    // token: "http://localhost:8080/realms/master/protocol/openid-connect/token",
    profile(profile) {
        console.log(profile);
        return {
            ...profile,
        };
    },
});

/**
 * @type {import("@auth/core").AuthConfig}
 */
export const authConfig = {
    providers: [KeycloakProvider],
    basePath: "/api/auth",
    callbacks: {
        session({ session, token }) {
            console.log(session, token);
            return session;
        },
    },
};

export default KeycloakProvider;
