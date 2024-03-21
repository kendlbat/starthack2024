import Keycloak from "@auth/core/providers/keycloak";

const KeycloakProvider = Keycloak({
    name: "keycloak",
    issuer: "http://localhost:8080/realms/master",
    clientId: "schaeppli",
    // WHEN DEPLOYING: Replace these with environment variables
    // Just here because we don't have the time for HTTPS / keycloak prod
    clientSecret: "4pIO9I2747BwuMdQFYOt2vig2jVXya3X",
    authorization:
        "http://localhost:8080/realms/master/protocol/openid-connect/auth",
    token: "http://localhost:8080/realms/master/protocol/openid-connect/token",
});

export default KeycloakProvider;
