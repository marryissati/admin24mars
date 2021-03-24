import { initAuth0 } from "@auth0/nextjs-auth0";

import { getDecryptedSecret } from "../utils/encryption/decryptit"
import { enc_DOMAIN, enc_Client_ID, enc_CLIENT_SECRET, encCOOKIE_SECRET } from "../utils/encryption/service-account.enc"

export default initAuth0({
  domain: getDecryptedSecret(enc_DOMAIN),
  clientId: getDecryptedSecret(enc_Client_ID),
  clientSecret: getDecryptedSecret(enc_CLIENT_SECRET),
  scope: "openid profile",
  // redirectUri:  "http://localhost:3000/api/callback",
  // postLogoutRedirectUri: "http://localhost:3000/",
  redirectUri: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://admin88-alpha.vercel.app/api/callback` : "http://localhost:3000/api/callback",
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_VERCEL_URL ? 'https://admin88-alpha.vercel.app/' : "http://localhost:3000/",

  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: getDecryptedSecret(encCOOKIE_SECRET),
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false,
  },
});

