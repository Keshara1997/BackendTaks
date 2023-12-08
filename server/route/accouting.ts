import express from "express";
import { addAccrualAccounting } from "../service/service";

const router = express.Router();

router.get('/addAccrualAccounting', async (req, res) => {
    try{
        const accounting = await addAccrualAccounting();
        res.status(200).json({massage: "success", data: accounting});

        //terminal log test success or not
        console.log("getAccounting success");
        
        
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
        //terminal log test success or not
        console.log("getAccounting error");
    }
}
);

export default router;