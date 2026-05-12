// Role-based access control middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

    
    if (!roles.includes(req.user.role.name)) {
      return res.status(403).json({ 
        message: `Role (${req.user.role.name}) is not allowed to access this resource` 
      });
    }
    next();
  };
};
