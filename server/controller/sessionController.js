const sessionController = {

  // createSession - create a new session for a user
  createSession: (req, res, next) => {
    //if there is no session, create one
    if (!req.session.userId) {
      req.session.userId = res.locals.userId;
    }
    else {
      //if there is a session, destroy it and create a new one
      req.session.destroy();
      req.session.userId = res.locals.userId;
    }
    return next();
  },

  // verifySession - verify a user's session
  verifySession: (req, res, next) => {
    //if there is no session, redirect to login
    if (!req.session.userId) {
      return res.redirect('/login');
    }
    else {
      return next();
    }
  }
}
export default sessionController
