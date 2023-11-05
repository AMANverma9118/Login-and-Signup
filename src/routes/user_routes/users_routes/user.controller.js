const UserModel = require('../../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { UserEmail, UserName, UserPassword } = req.body
    try {
        let checkUser = await UserModel.findOne({ "$or": [{ UserEmail: UserEmail }, { UserName: UserName }] })

        if (!checkUser) {
            const salt = await bcrypt.genSalt()
            const UserPasswordHash = await bcrypt.hash(UserPassword, salt)

            let result = await UserModel.create({
                ...req.body,
                UserPassword:UserPasswordHash
            })
            res.send({
                data: result,
                message: "User created successfully....!!",
                status: true
            })
        }
        else {
            res.status(403).json({ status: false, error: "User already exist" })
        }





    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}

const loginUser = async (req, res) => {
    const { UserEmail, UserPassword } = req.body;
    try {
        const result = await UserModel.findOne({ UserEmail: UserEmail })
        if (!!result) {
            let isPasswordValid = await bcrypt.compare(UserPassword, result.UserPassword)
            if(!!isPasswordValid)
            {
                const token = jwt.sign({user_id: result?._id,UserEmail},process.env.TOKEN_KEY);

                res.send({
                    data: {...result, token},
                    status: true
                })
            }else{
                res.status(403).json({ status: false, error: "Password/Email is not correct" })
            }
        }
        else {
            res.status(403).json({ status: false, error: "Password/Email is not correct" })
        }
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}

module.exports = {
    createUser,
    loginUser

};
