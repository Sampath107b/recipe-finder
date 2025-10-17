const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'30d',
  });
};

const registerUser=async(req,res)=>{
  try{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const userExists=await User.findOne({email});
    if (userExists){
      res.status(400);
      throw new Error('user already exists');
    }
    const user=await User.create({
      name, 
      email,
      password,
    });

    if (user){
      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id),
      });
    }
    else{
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
  catch(err){
    res.status(500).json({message:err.message});
  }

};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id),
      });
  }
    else {
  res.status(401);
  throw new Error('Invalid credentials');
}
  }
  catch (err) {
  res.status(500).json({ message: err.message });
}
};

module.exports={registerUser,loginUser,};
