import { Router, type IRouter } from "express";
import healthRouter from "./health";
import requestsRouter from "./requests";
import adminRouter from "./admin";
import uploadsRouter from "./uploads";
import adsRouter from "./ads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(requestsRouter);
router.use(adminRouter);
router.use(uploadsRouter);
router.use(adsRouter);

export default router;
