import { Router } from "express";
const router = Router();

router.post('/health/feedback',async(req,res)=>{
  try {
    const {clerkId} = req.body
    const userDetails = await prisma.user.findUnique({
      where:{
        clerkId:clerkId
      },
      include:{
        healthProfile:true,
        badHabits:true,
        sleepPatterns:true,

      }
    })



    console.log('user details:',userDetails);
    return res.status(200).json({message:"user details",data:userDetails})
  } catch (error) {
    console.error('Error in health feedback route:', error);
    return res.status(500).json({ message: 'Internal server error' });

  }
})
