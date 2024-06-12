import jwt from 'jsonwebtoken'
//--
import userModel from '../Models/User.js'

const verifyUser = async (req, res, next) => {


    const token = req.header('Authorization')?.split(" ");

    if (token.length === 1) {
        req.user = null;
        return next();
    }

    //Verify Token
    if (token?.length !== 2) {
        return res.status(403).json({
            message: "This Route Is Protected"
        })
    }

    const authToken = token[1];

    try {
        const jwtPyload = jwt.verify(authToken, process.env.JWTSECRET);
        const user = await userModel.findOne({ _id: jwtPyload.id });
        const mainUser = user.toObject();
        Reflect.deleteProperty(mainUser, 'password');
        req.user = mainUser;
        next();
    } catch (error) {
        res.status(402).json({ ErrorJWT: error });
    }

}

export default verifyUser;
