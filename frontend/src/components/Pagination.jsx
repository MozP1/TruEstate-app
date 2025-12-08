import React from "react";

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const last = Math.max(1, Math.ceil((total || 0) / (pageSize || 10)));
  return (
    <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>
        Prev
      </button>
      <span>Page {page} of {last}</span>
      <button onClick={() => onPageChange(Math.min(last, page + 1))} disabled={page >= last}>
        Next
      </button>
    </div>
  );
}
