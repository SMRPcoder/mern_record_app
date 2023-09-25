import { Router } from "express";
import AuthUser from "../middleware/AuthUser";
import { startRecording, stopRecording } from "../controller/RecordController";


const RecordRouter=Router();

RecordRouter.post("/start",AuthUser,startRecording);
RecordRouter.post("/stop",AuthUser,stopRecording);

export default RecordRouter;