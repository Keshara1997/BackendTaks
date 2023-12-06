import express from "express";
import { getAccounting, getAccountingById, addAccounting, updateAccounting, deleteAccounting } from "../controllers/accounting";

const router = express.Router();

router.get('/getAccounting', async (req, res) => {
    try{
        const accounting = await getAccounting();
        res.status(200).json({massage: "success", data: accounting});
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
    }
}
);

router.get('/getAccountingById/:id', async (req, res) => {
    try{
        const accounting = await getAccountingById(req.params.id);
        res.status(200).json({massage: "success", data: accounting});
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
    }
}
);

router.post('/addAccounting', async (req, res) => {
    try{
        const accounting = await addAccounting(req.body);
        res.status(200).json({massage: "success", data: accounting});
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
    }
}
);

router.put('/updateAccounting/:id', async (req, res) => {
    try{
        const accounting = await updateAccounting(req.params.id, req.body);
        res.status(200).json({massage: "success", data: accounting});
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
    }
}
);

router.delete('/deleteAccounting/:id', async (req, res) => {
    try{
        const accounting = await deleteAccounting(req.params.id);
        res.status(200).json({massage: "success", data: accounting});
    }
    catch(err){
        res.status(400).json({massage: "error", data: err});
    }
}
);

export default router;