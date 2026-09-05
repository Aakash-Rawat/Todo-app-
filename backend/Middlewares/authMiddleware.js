import jwt from 'jsonwebtoken';

const isAuthenticated = async(req,res,next)=>{
    try {
         
        const authHeader = req.headers.authorization?.split(" ")[1];
        
        if(!authHeader){
            return res.status(400).json({message:"you are not authorized"});
        }


        const decoded = jwt.verify(authHeader,process.env.JWT_SECRET);
          
        req.user = decoded;
        next();
        

        
    } catch (error) {
         return res.status(401).json({
            message: "Invalid or expired token"
    })
}
}

export default isAuthenticated;

