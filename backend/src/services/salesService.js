import { loadCSV, queryCSV } from '../utils/csvAdapter.js';

const DS = (process.env.DATA_SOURCE || 'csv').toLowerCase();

// Load CSV once at startup in CSV mode
if (DS === 'csv') loadCSV();

export async function querySales(q) {
  if (DS === 'csv') {
    return queryCSV(q);
  }
  // (Optional) Add DB mode later
  return { items: [], page: 1, pageSize: 10, total: 0, sort: { by: 'date', order: 'desc' } };
}
