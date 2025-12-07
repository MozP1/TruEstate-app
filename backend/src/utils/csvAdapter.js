import fs from 'fs';
import path from 'path';

let rows = [];

export function loadCSV() {
  const csvPath = path.resolve(process.env.CSV_PATH || './data/truestate_assignment_dataset.csv');
  const text = fs.readFileSync(csvPath, 'utf-8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(',').map(s => s.trim());

  rows = lines.slice(1).map(line => {
    const parts = line.split(',').map(s => s.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = parts[i] ?? ''));
    // normalize useful fields
    const d = new Date(obj.Date || obj['Order Date'] || obj['Transaction Date'] || obj.date);
    obj.date = isNaN(d) ? null : d.toISOString().slice(0, 10);
    obj['Quantity'] = Number(obj['Quantity'] ?? obj.quantity ?? 0) || 0;
    obj['Customer Name'] = obj['Customer Name'] ?? obj.customer_name ?? '';
    obj['Phone Number'] = obj['Phone Number'] ?? obj.phone_number ?? '';
    obj['Product Category'] = obj['Product Category'] ?? obj.product_category ?? '';
    obj['Payment Method'] = obj['Payment Method'] ?? obj.payment_method ?? '';
    obj['Customer Region'] = obj['Customer Region'] ?? obj.customer_region ?? '';
    obj['Gender'] = obj['Gender'] ?? obj.gender ?? '';
    return obj;
  });

  console.log(`CSV loaded: ${rows.length} rows`);
}

function includesCI(hay, needle) {
  return String(hay || '').toLowerCase().includes(String(needle || '').toLowerCase());
}
function inMulti(val, list) {
  if (!list) return true;
  const arr = Array.isArray(list) ? list : [list];
  return arr.map(v => String(v).toLowerCase()).includes(String(val || '').toLowerCase());
}

export function queryCSV(params) {
  const {
    q, region, gender, category, payment,
    date_from, date_to, sort = 'date', order = 'desc', page = 1
  } = params;

  let out = rows.filter(r => {
    // search on name OR phone (case-insensitive)
    if (q && !(includesCI(r['Customer Name'], q) || includesCI(r['Phone Number'], q))) return false;

    // filters (multi-select friendly)
    if (!inMulti(r['Customer Region'], region)) return false;
    if (!inMulti(r['Gender'], gender)) return false;
    if (!inMulti(r['Product Category'], category)) return false;
    if (!inMulti(r['Payment Method'], payment)) return false;

    // date range
    if (date_from && r.date && r.date < date_from) return false;
    if (date_to && r.date && r.date > date_to) return false;

    return true;
  });

  // sorting
  const sorters = {
    date: (a, b) => (a.date || '') < (b.date || '') ? -1 : 1,
    quantity: (a, b) => (a['Quantity'] || 0) - (b['Quantity'] || 0),
    customer_name: (a, b) => String(a['Customer Name'] || '').localeCompare(String(b['Customer Name'] || ''))
  };
  out.sort(sorters[sort] || sorters.date);
  if (String(order).toLowerCase() !== 'asc') out.reverse();

  // pagination (fixed 10 per spec)
  const pageSize = 10;
  const p = Math.max(1, Number(page) || 1);
  const start = (p - 1) * pageSize;

  return {
    items: out.slice(start, start + pageSize),
    page: p,
    pageSize,
    total: out.length,
    sort: { by: sort, order: String(order).toLowerCase() }
  };
}
