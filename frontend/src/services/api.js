import axios from "axios";

const API = "http://localhost:4000/api/sales";

export async function fetchSales(params) {
  const response = await axios.get(API, { params });
  return response.data;
}
