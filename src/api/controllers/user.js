import Boom from 'boom';


/**
 * sets a new password for the logged in user.
 */
export function resetPassword(request, reply) {
  let userInstance = request.auth.credentials.user;
  let promise = userInstance
    .comparePassword(request.payload.oldPassword)
    .then(function(samePassword) {
      if (!samePassword) {
        throw Boom.create(401, 'Old password doesnt matches with the current password');
      }
      userInstance.password = request.payload.newPassword;
      return userInstance.hashPassword();
    })
    .then(function(userInstance) {
      return userInstance.save();
    })
    .then(function(userInstance) {
      return {};
    });
  reply(promise);
}
