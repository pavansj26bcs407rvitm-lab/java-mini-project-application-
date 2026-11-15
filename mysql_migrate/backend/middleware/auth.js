const jwt=require('jsonwebtoken'); const {db}=require('../config/db');
async function protect(req,res,next){
 try { const h=req.headers.authorization||'', token=h.startsWith('Bearer ')?h.slice(7):null;
  if(!token)return res.status(401).json({message:'Please log in.'});
  const d=jwt.verify(token,process.env.JWT_SECRET); const [rows]=await db().query('SELECT id,name,email,role FROM users WHERE id=?',[d.id]);
  if(!rows.length)return res.status(401).json({message:'Account not found.'});
  const u=rows[0]; req.user={...u,_id:u.id}; next();
 } catch(e){return res.status(401).json({message:'Session expired. Log in again.'});}
}
function adminOnly(req,res,next){if(req.user?.role!=='admin')return res.status(403).json({message:'Admin only.'});next();}
module.exports={protect,adminOnly};
