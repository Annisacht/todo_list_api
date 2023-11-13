const Cryptr = require('cryptr');
const cryptr = new Cryptr('kunci')
const jwt = require('jsonwebtoken')
const UserModelsMongo = require('../../mongodb/scheme/users')



async function Register(req, res, next) {
    const { username, password, email, firstName, lastName } = req.body;
    const registeredUser = await UserModels.findOne({ where: { email } });

    if (registeredUser) {
        return res.status(400).send({
            message: 'This user has been registered',
            statusCode: 400
        });
    }

    const encryptedPassword = cryptr.encrypt(password);
    let dataPassingToDB = {
        username: username,
        password: encryptedPassword,
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    let createdData = await UserModels.create(dataPassingToDB)
    const token =  jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            username: username,
            password: encryptedPassword,
            email: email
        }
      }, 'kunci')
    console.log('token =',token)

    if (!createdData.dataValues) {
        res.status(400).send({
            message: 'wrong username or password',
            statusCode: 400
        });
    } else {
        res.send({
            message: 'successfully created user data!',
            access_token: token,
            statusCode: 200,
        });
    }

}


async function Login(req, res, next) {
    const getUsers = await UserModels.findOne({
        where: {username: req.body.username}
    })

    const decryptedPassword = cryptr.decrypt(getUsers.dataValues.password)
    console.log('decrypt =', decryptedPassword)
    if (req.body.password !== decryptedPassword) {
        res.status(400).send({
            message: 'wrong username or password',
            statusCode: 400
        })
    } else {
        console.log(getUsers.dataValues)
        // console.log(req.body)
        res.send('login here..')
    }
}

async function RegisterDB(req, res, next) {
    const { username, password, email } = req.body;

    try{
        let getUser = await UserModelsMongo.findOne({
            username: username
        })

        if ( getUser ) {
            res.status(400).send({
                message: 'Data is exists, please create another data!',
                statusCode: 400
            })
        } else {
            let dataPassingToDB = {
                username: username,
                password: encryptedPassword,
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: 10
            } 
            let createdData = await UserModelsMongo.create(dataPassingToDB)
    
            if ( !createdData ) {
                res.status(400).send({
                    message: 'wrong username or password',
                    statusCode: 400
                })
            } else {
                res.send({
                    message: 'successfull to create data users!',
                    statusCode: 200,
                })
            }
        }
    } catch(error) {
        console.log(error)
        res.status(400)
    }
}

async function LoginDB(req, res, next) {
    const { username, password } = req.body

    // Get Users Exist
    try {
        let getUser = await UserModelsMongo.aggregate([
            {
                $match: {
                    $or: [
                        { username: username },
                        { email: username }
                    ]
                }
            }
        ])

        if ( getUser.length < 1 ) {
            res.status(400).send({
                message: 'Data is not exists!',
                statusCode: 400
            })
        } else {
            let passwordUser = CryptrNew.decrypt(getUser[0].password)

            if ( req.body.password !== passwordUser ) {
                res.status(400).send({
                    message: 'Username or Password is wrong!',
                    statusCode: 400
                })
            } else {
                let expiredToken = Math.floor(Date.now() / 1000) + (60 * 60)
                let createAccessToken = JWT.sign({
                    exp: expiredToken,
                    data: {
                        user: getUser[0].username,
                        email: getUser[0].email,
                        no: getUser[0].id,
                    }
                }, 'secret-no-rumpi')
    
                let dataPassingClient = {
                    access_token: createAccessToken, // access token expired 1 day
                    refresh_token: createAccessToken, // refresh token expired 1 month
                    expired_date: expiredToken,
                    user: getUser[0].username,
                    id: getUser[0].id,
                }
    
                res.status(200).send({
                    message: 'Successfull to login user!',
                    statusText: 'Successfull to login user!',
                    statusCode: 200,
                    data: dataPassingClient
                })
            }
        }
    } catch(error) {
        console.log(error)
        res.status(400)
    }
}

module.exports = {
    Register,
    Login,
    RegisterDB,
    LoginDB,
}