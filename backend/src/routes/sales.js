import { Router } from 'express';
import { listSales } from '../controllers/salesController.js';

const router = Router();

// GET /api/sales
router.get('/', listSales);

export default router;
