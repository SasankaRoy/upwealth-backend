
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
// const process.env.SECRET_KEY = require('../config/SECRET');



// RETURN MSG FUNCTION 

const returnToUser = (status,title,msg,icon) =>{
    return ({'status':status,'title':title,'msg':msg,'icon':icon});
}


// userSignup function 
const userSignup = async (req, res) =>{
   const {firstName,lastName,email,phoneNumber,password,confirmPassword} = req.body;

   if(!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword){
      const response = returnToUser(false,"Error","Please fill all the input fields","error");
      return res.json(response);
   }else{
   const emailExist = await userModel.countDocuments({email:email});
   const numberExist = await userModel.countDocuments({phone_number:phoneNumber});

   if(phoneNumber.length<10 || phoneNumber.length>10){
    const response = returnToUser(false,"Error","Please enter a valid phone number.","error");
    return res.json(response);
   }

   if(password!=confirmPassword){
    const response = returnToUser(false,"Error","Mismatch between password and confirm password.","error");
    return res.json(response);
   }

   if(emailExist>0){
    const response = returnToUser(false,"Error","Looks like you've already signed up with that email","error");
    return res.json(response);
    }else if(numberExist>0){
        const response = returnToUser(false,"Error","This phone number is already registered..","error");
        return res.json(response);
    }else{
        try{
            const userSignup = await userModel.create({
                first_name:firstName,
                last_name:lastName,
                email:email,
                phone_number:phoneNumber,
                password:password
            });

            const response = returnToUser(true,"Success","All done! You've successfully signed up.","success");
            return res.json(response);
        }catch (err) {
            const response = returnToUser(false,"Error","Oops! Signup was unsuccessful this time.","error");

            return res.json(response);
        }
    }
   }
}
// userSignup function 

const userLogin = async (req,res)=>{
    const {username , password}= req.body;
   if(!username || !password){
    const response = returnToUser(false,"Error","Fill email and password fields","error");
    return res.json(response);
   }
   try{
    const checkEmail = await userModel.findOne({email:username});
    if(checkEmail){
        if(checkEmail.password == password){
           const token = jwt.sign({name:checkEmail.first_name,id:checkEmail._id},process.env.SECRET_KEY,{expiresIn:"2 day"});
           res.setHeader('token',token);
           res.cookie('user',token);
           const response = returnToUser(true,"Success","Congratulations, you're logged in!.","success");
          return res.json(response);
        }else{
            const response = returnToUser(false,"Error","Incorrect password. Please try again.","error");
            return res.json(response);
        }
    }else{
        const response = returnToUser(false,"Error","Invalid email or password. Please try again.","error");
        return res.json(response);
    }
   }catch (err){
    const response = returnToUser(false,"Error","Server crashed","error");
    return res.json(response);
   }
  
   

    
 
}






module.exports = {userSignup,userLogin};