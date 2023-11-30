const isAdmin = async (req, res, next) => {
    if (req.user.role === 'ADMIN') {
        return next();
    }
    return res.status(403).json({ message: 'This Route Is Accessable Only For Admins' });
}

export default isAdmin