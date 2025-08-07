const authorizeRoles = (...authorizeRoles) => {
    return (req, res, next) => {
        if (!authorizeRoles.includes(req.userRole)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    }
}

module.exports = authorizeRoles