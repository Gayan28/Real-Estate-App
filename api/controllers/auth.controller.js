import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async(req,res) =>{
    const {username, email, password } = req.body;                 //DB Operations

    try{
    
    //Hash the password

    const hashedPassword =await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    //Create a new user and save it in the database

    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:  hashedPassword,
        },
    });

    console.log(newUser);

    res.status(201).json({message: "User created successfully"});

    }
    catch(err){
        console.log(err);
        res.status(501).json({message: "User already exists"});
    }

};
export const login =async (req,res) =>{
    const {username, password} = req.body;

    try{

    //Check if the user exists or not

    const user =await prisma.user.findUnique({
        where:{username},
    });

    if (!user) return res.status(401).json({message: "Invalid Credentials"});

    //Check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(401).json({message: "Invalid Password"});

    //Generate cookie token and send to the user

    //res.setHeader('Set-Cookie', 'test' + "myValue").json("success")
    const age =1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
    {
      id:user.id,
      isAdmin: false,
    },
     process.env.JWT_SECRET_KEY,
       {expiresIn: age}
    );

    const {password: userPassword, ...userInfo} = user

    res.cookie("token", token, {
        httpOnly:true,
        //secure:true
        maxAge: age,
    }).status(200).json(userInfo);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }

}
export const logout = (req,res) =>{
    res.clearCookie("token").status(200).json({message:"Logout successful"});
}