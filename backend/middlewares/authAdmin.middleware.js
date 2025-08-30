import JWT from "jsonwebtoken"
// Admin authentication middleware 
const authAdmin = async(req,res,next)=>{
    try {
        const {atoken} = req.headers
        if (!atoken) {
           return  res.json({ success: false, message: "Not Authorized Login agan" });
            
        }
        const token_decode = JWT.verify(atoken,process.env.JWT_SECRETE)
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return  res.json({ success: false, message: "Not Authorized Login agan" });
            
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }


}
export {authAdmin}