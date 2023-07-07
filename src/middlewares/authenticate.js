import passport from "passport";

export const authenticate = (req, res, next) => {
  passport.authenticate("jwt", (err, user, data) => {
    if (err) next(err);
    if (!user) {
      return res.status(401).json({
        message: "unauthorised access no token",
      });
    }
    // inside our request , we make new user property and attach user in our request
    req.user = user;
    next();
  })(req, res, next);
};
