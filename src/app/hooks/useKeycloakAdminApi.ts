import KcAdminClient from "@keycloak/keycloak-admin-client";
import keycloak from "src/keycloak";
import { useParams } from "react-router-dom";

export const useKeycloakAdminApi = () => {
  let { realm } = useParams();
  
  const getServerUrl = () => {
    if (typeof keycloak.authServerUrl !== "undefined") {
      var u = keycloak.authServerUrl;
      if (u.charAt(u.length - 1) == "/") {
        u = u.substring(0, u.length - 1);
      }
      return u;
    } else {
      return undefined;
    }
  };

  const getRealm = () => {
    console.log("getRealm", realm);
    return realm;
  };

  const getAuthRealm = () => {
    if (typeof keycloak.realm !== "undefined") {
      return keycloak.realm;
    } else {
      return undefined;
    }
  };

  const settings = {
    baseUrl: getServerUrl(),
    realmName: getRealm(),
  };

  const kcAdminClient = new KcAdminClient(settings);

  const setKcAdminClientAccessToken = async () => {
    kcAdminClient.setAccessToken(keycloak.token!);
  };

  // Should be able to initiate off the bat and still provide as a callback
  setKcAdminClientAccessToken();

  return [
    kcAdminClient,
    setKcAdminClientAccessToken,
    getServerUrl,
    getRealm,
    getAuthRealm,
  ] as const;
};
