
function validationRegister(req, res, next){
    const { username, password} = req.body



    if ( !username || !password ) {
        res.status(400).send({
            message: 'Fields is not complete!',
            statustext: 'Fields is not complete!',
            statusCode: 400,  
        })
    } else {
        next()
    }
}

function validationLogin(req, res, next) {
    const { username, password} = req.body

    if ( !username || !password) {
        res.status(400).send({
         message: 'Fields is not complete!',
         statustext: 'Fields is not complete!',
         statusCode: 400,   
        })
    } else {
        next()
    }
}

module.exports = {
    validationRegister,
    validationLogin
}