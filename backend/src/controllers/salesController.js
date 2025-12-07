import { querySales } from '../services/salesService.js';

export async function listSales(req, res, next) {
  try {
    const result = await querySales(req.query);
    res.json(result);
  } catch (e) {
    next(e);
  }
}
