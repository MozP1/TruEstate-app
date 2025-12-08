import React from "react";

export default function SortSelect({ sort, order, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <select value={sort} onChange={(e) => onChange(e.target.value, order)}>
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customer_name">Customer Name</option>
      </select>
      <select value={order} onChange={(e) => onChange(sort, e.target.value)}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
