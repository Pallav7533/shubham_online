import { Router, type IRouter } from "express";
import healthRouter from "./health";
import requestsRouter from "./requests";
import adminRouter from "./admin";
import uploadsRouter from "./uploads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(requestsRouter);
router.use(adminRouter);
router.use(uploadsRouter);

export default router;
