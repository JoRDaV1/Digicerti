

const fetchcertificate = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const certificateid = req.header('certificateid');

    if (!certificateid) {
        res.status(401).send({ error: "Please authenticate using a valid certificate id" })
    }
    try {
        id = certificateid;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchcertificate;