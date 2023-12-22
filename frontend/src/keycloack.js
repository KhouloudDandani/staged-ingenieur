import Keycloak from 'keycloak-js';

let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'react-client',
  onLoad: 'check-sso', // check-sso | login-required
  KeycloakResponseType: 'code',
  enableLogging: true,

  
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: initOptions.onLoad,
  KeycloakResponseType: 'code',
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", 
  checkLoginIframe: false,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    console.error("Authentication failed");
  } else {
    console.info("Authenticated");
    // Add code to redirect the user to the protected area
    window.location.href = '/employees'; // Adjust the URL as needed
  }
})
.catch((error) => {
  console.error("Keycloak initialization failed", error);
});

export default kc;
