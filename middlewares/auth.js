import jwt from 'jsonwebtoken'

function auth(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).redirect("/user/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized",
        })
    }
}

export default auth