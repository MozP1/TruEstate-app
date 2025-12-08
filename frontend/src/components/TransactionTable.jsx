import React from "react";

const cell = { padding: "8px 10px", borderBottom: "1px solid #eee" };

export default function TransactionTable({ rows }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fafafa" }}>
            <th style={cell}>Date</th>
            <th style={cell}>Customer</th>
            <th style={cell}>Phone</th>
            <th style={cell}>Category</th>
            <th style={cell}>Quantity</th>
            <th style={cell}>Final Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={cell}>{r.date || r.Date || ""}</td>
              <td style={cell}>{r["Customer Name"] || r.customer_name || ""}</td>
              <td style={cell}>{r["Phone Number"] || r.phone_number || ""}</td>
              <td style={cell}>{r["Product Category"] || r.product_category || ""}</td>
              <td style={cell}>{r["Quantity"] ?? r.quantity ?? ""}</td>
              <td style={cell}>{r["Final Amount"] ?? r.final_amount ?? ""}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan="6" style={{ padding: 20, textAlign: "center" }}>
                No matches
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
