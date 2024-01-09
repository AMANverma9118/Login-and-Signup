const UserModel = require('../../../models/users');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const users = require('../../../models/users');
const config = require ('../../../config/config');

const sendresetPasswordMail = async(UserName,UserEmail,token) =>{
    try {
        
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        })

        const mailOptions = {
            from:config.emailUser,
            to:UserEmail,
            subject:'For Reset Password',
            html:'<p> Hii'+UserName+',Please copy the link <a href="" ></a> and reset your password'
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                 console.log(error);
            }
            else{
                console.log('Mail has been sent',info.response);
            }
        })

    } catch (error) {
        res.status(400).json({ status: flase, msg: error.message })
    }
}


const createUser = async (req, res) => {
    const { UserEmail, UserName, UserPassword } = req.body



    try {
        let checkUser = await UserModel.findOne({ "$or": [{ UserEmail: UserEmail }, { UserName: UserName }] })

        if (!checkUser) {
            const salt = await bcrypt.genSalt()
            const UserPasswordHash = await bcrypt.hash(UserPassword, salt)

            let result = await UserModel.create({
                ...req.body,
                UserPassword: UserPasswordHash
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
            if (!!isPasswordValid) {
                const token = jwt.sign({ user_id: result?._id, UserEmail }, process.env.TOKEN_KEY);

                res.send({
                    data: { ...result, token },
                    status: true
                })
            } else {
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


const forget_password = async (req, res) => {
    const {UserEmail} = req.body;
    try {
        
        const result = await UserModel.findOne({ UserEmail: UserEmail });

        if(!!result)
        {
            const randomstring = randomstring.generate();
            const data = await users.updateOne({UserEmail:UserEmail},{$set:{token:randomstring}});

            sendresetPasswordMail(result.UserName,result.UserEmail,randomstring);

            res.status(200).json({ status: true, msg: "check your inbox email and change the password"});
        }
        else{
            res.status(200).json({ status: true, msg: "Email does not exist" })
        }
        


    } catch (error) {
        res.status(400).json({ status: false, error: error })
    }
}



module.exports = {
    createUser,
    loginUser,
    forget_password

};
