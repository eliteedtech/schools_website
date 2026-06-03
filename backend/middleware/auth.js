const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here_make_it_long_and_secure';
    const decoded = jwt.verify(token, jwtSecret);
    
    // Get user from database to ensure they still exist and are active
    const user = await User.findByPk(decoded.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid - user not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    // Add user to request object
    req.user = {
      id: user.id,
      role: user.role,
      schools: user.schools,
      email: user.email,
      name: user.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};

// School access middleware
const schoolAccess = (permission = null) => {
  return async (req, res, next) => {
    try {
      const schoolId = req.params.schoolId || req.body.school || req.query.school;
      
      if (!schoolId) {
        return res.status(400).json({ message: 'School ID is required' });
      }

      // Super admin has access to all schools
      if (req.user.role === 'super_admin') {
        req.schoolId = schoolId;
        return next();
      }

      // Get full user data with school permissions
      const user = await User.findByPk(req.user.id);
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if user has access to this school
      const schoolAccess = user.schools.find(s => 
        s.school.toString() === schoolId.toString()
      );

      if (!schoolAccess) {
        return res.status(403).json({ 
          message: 'Access denied to this school' 
        });
      }

      // Check specific permission if required
      if (permission && !user.hasPermission(schoolId, permission)) {
        return res.status(403).json({ 
          message: `Access denied. Required permission: ${permission}` 
        });
      }

      req.schoolId = schoolId;
      req.schoolRole = schoolAccess.role;
      req.schoolPermissions = schoolAccess.permissions;
      
      next();
    } catch (error) {
      console.error('School access middleware error:', error);
      res.status(500).json({ message: 'Server error in school access check' });
    }
  };
};

// Super admin only middleware
const superAdminOnly = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ 
      message: 'Access denied. Super admin privileges required.' 
    });
  }
  next();
};

// Owner or admin middleware (for school-specific operations)
const ownerOrAdmin = async (req, res, next) => {
  try {
    const schoolId = req.params.schoolId || req.body.school || req.query.school;
    
    if (req.user.role === 'super_admin') {
      return next();
    }

    const user = await User.findByPk(req.user.id);
    const schoolAccess = user.schools.find(s => 
      s.school.toString() === schoolId.toString()
    );

    if (!schoolAccess || !['owner', 'admin'].includes(schoolAccess.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Owner or admin privileges required for this school.' 
      });
    }

    next();
  } catch (error) {
    console.error('Owner/Admin middleware error:', error);
    res.status(500).json({ message: 'Server error in permission check' });
  }
};

// Rate limiting for sensitive operations
const sensitiveOperation = (req, res, next) => {
  // This can be enhanced with Redis for distributed rate limiting
  // For now, it's a placeholder for future implementation
  next();
};

module.exports = {
  auth,
  authorize,
  schoolAccess,
  superAdminOnly,
  ownerOrAdmin,
  sensitiveOperation
};