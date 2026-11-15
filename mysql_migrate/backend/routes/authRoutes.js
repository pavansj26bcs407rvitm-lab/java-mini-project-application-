const router=require('express').Router(),bcrypt=require('bcryptjs'),jwt=require('jsonwebtoken');
const {db}=require('../config/db'),{protect}=require('../middleware/auth');
const safe=u=>({id:u.id,_id:u.id,name:u.name,email:u.email,role:u.role});
const token=u=>jwt.sign({id:u.id},process.env.JWT_SECRET,{expiresIn:'7d'});
router.post('/signup',async(req,res)=>{try{
 const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({message:'Enter name, email and password.'});
 if(String(password).length<6)return res.status(400).json({message:'Password must contain at least 6 characters.'});
 const e=String(email).trim().toLowerCase();const [exists]=await db().query('SELECT id FROM users WHERE email=?',[e]);
 if(exists.length)return res.status(409).json({message:'Email already registered. Please log in.'});
 const [r]=await db().query('INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)',[String(name).trim(),e,await bcrypt.hash(password,12),'student']);
 const u={id:r.insertId,name:String(name).trim(),email:e,role:'student'};res.status(201).json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message});}});
router.post('/login',async(req,res)=>{try{
 const [rows]=await db().query('SELECT * FROM users WHERE email=?',[String(req.body.email||'').trim().toLowerCase()]);const u=rows[0];
 if(!u||!(await bcrypt.compare(req.body.password||'',u.password)))return res.status(401).json({message:'Incorrect email or password.'});
 res.json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message});}});
router.get('/me',protect,(req,res)=>res.json({user:safe(req.user)}));
module.exports=router;
