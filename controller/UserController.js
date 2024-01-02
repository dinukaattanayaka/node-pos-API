const { default: mongoose } = require('mongoose');
const userSchema = require('../model/UserSchema');
const bcrypt = require ('bcrypt');
const salt = 10;
const nodemailer= require('nodemailer');

const register = async(req,res)=>{

    /*const transporter= nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'fullstackpractical@gmail.com',
            pass: 'lxzn nofk tcvn qmmu',
        }
    });
    const mailOption= {
        from:'fullstackpractical@gmail.com',
        to: req.body.email,
        subject:'New Account Creation.',
        text:'you have created your account'
    }
    transporter.sendMail(mailOption , function (error ,info){
        if (error){
            return res.status(500).json({'error':error})
        }else{
            return res.status(201).json({'information':info.response})
        }

    })*/

    userSchema.findOne({'email':req.body.email}).then(result =>{
        if( result==null){
            bcrypt.hash(req.body.password , salt, function(err,hash){
                if(err){
                    return response.status(500).json(err);
                }
                const user = new userSchema({
                    fullName: req.body.fullName,
                    password: hash,
                    email: req.body.email,
                    activeState: req.body.activeState
                });

                const transporter= nodemailer.createTransport({
                    service: 'gmail',
                    auth:{
                        user:'fullstackpractical@gmail.com',
                        pass: 'lxzn nofk tcvn qmmu',
                    }
                });
                const mailOption= {
                    from:'fullstackpractical@gmail.com',
                    to: req.body.email,
                    subject:'New Account Creation.',
                    text:'you have created your account'
                }
                transporter.sendMail(mailOption , function (error ,info){
                    if (error){
                        return res.status(500).json({'error':error})
                    }else{
                        user.save().then(saveResponse=>{
                            return res.status(201).json({'message':'saved!'})

                        }).catch(error=>{
                            return res.status(500).json(error);
                        });
                    }

                })


            })
        }else{
            return res.status(409).json({'err':'already exists!'})
        }
    })


}

const login = (req,res)=>{
    
}

module.exports={register,login}