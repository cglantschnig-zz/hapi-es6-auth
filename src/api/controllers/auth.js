/**
 * This function is about to authenticate the user. It returns an access token.
 * The user can use different grant types with the according data to login.
 * Available Grant Types:
 * - password --> (username, password)
 * - client_credentials --> (user_id)
 * - refresh_token --> (refresh_token)
 */
export function authenticate(request, reply) {
  throw new Error("Not implemented yet");
  var promise = null;
  switch (reply.payload.grant_type) {
    case 'password':

      break;
    default:

  }
}
