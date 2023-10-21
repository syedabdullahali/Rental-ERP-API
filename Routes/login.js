const router = require('express').Router();
//modelName
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
router.post('/:boolVal', async function (req, res) {
    try {
        let { email, password} = req.body;
        
        const {boolVal} = req.params
        let logo = ''
        let invoiceLogo = ''
        let TNC = ''
        let InvoiceTitle = ''
        let status = false
        
        const user = await User.findOne({ email });

        
        if(user.isAdmin===false && user.isAdminPatner===false ){
            const user2 = await User.findById({ _id:user.createrId });
            logo = user2?.brandLogo
            invoiceLogo = user2?.InvoiceLogo
            TNC=user2?.TNC
            InvoiceTitle =user2?.InvoiceTitle
            status = user2.status
        }
        else{
            logo = user?.brandLogo
            invoiceLogo = user?.InvoiceLogo
            TNC=user?.TNC
            InvoiceTitle =user?.InvoiceTitle
            status = user.status
        }
        if (user && logo!=='') {
               let valid = false;

               if(boolVal==='direct-login'){
               valid= password == user.password
               }else{
               valid= await bcrypt.compare(password, user.password);
               }

            if (!valid) {
                res.status(400).send("Password not matched");
            } else {

                const token = jwt.sign({ _id: user._id,
                                        email: user.email, 
                                        center: user.center,
                                        centerCode: user.centerCode, 
                                       }, 'sdiohufvhbiehhidethisthing', {
                    expiresIn: '45h'
                });

                res.header("auth-token", token).send({
                    token, user: {
                        username: user.username,
                        email: user.email,
                        center: user.center,
                        centerCode: user.centerCode,
                        emailUniqId:user._id,
                        isAdmin:user.isAdmin,
                        isAdminPatner:user.isAdminPatner,
                        isEmployee:user.isEmployee,
                        startDate:user.startDate,
                        expDate:user.expDate,
                        status:user.status,
                        brandLogo:logo,
                        InvoiceLogo:invoiceLogo,
                        TNC:TNC,
                        InvoiceTitle,
                        package:user.package,
                        createdBy:user.createdBy,
                        createrId:user.createrId,
                        profileLogo:user?.profileLogo,
                        memBerId:user?.memBerId
                    }
                });
            }
        } else {
            res.status(404).json({ message: 'User not found, Please Signup' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
});
module.exports = router;
