const sessionController = {

  // createSession - create a new session for a user
  createSession: (req, res, next) => {
    //if there is no session, create one
    if (!req.session.userId) {
      req.session.userId = '05a11cd8-7713-4f59-8628-5f9087f5d575'
    }
    else {
      //if there is a session, destroy it and create a new one
      req.session.destroy();
      req.session.userId = '05a11cd8-7713-4f59-8628-5f9087f5d575'
    }
    return next();
  },

  // verifySession - verify a user's session
  verifySession: (req, res, next) => {
    //if there is no session, redirect to login
    if (!req.session.userId) {
      return next()
    }
    else {
      return next();
    }
  }
}
export default sessionController
