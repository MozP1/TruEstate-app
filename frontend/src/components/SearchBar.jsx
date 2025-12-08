import React from "react";

export default function SearchBar({ value, onChange }) {
  const [v, setV] = React.useState(value || "");

  // keep local input in sync if parent changes
  React.useEffect(() => setV(value || ""), [value]);

  // debounce: wait 300ms after typing
  React.useEffect(() => {
    const t = setTimeout(() => onChange(v), 300);
    return () => clearTimeout(t);
  }, [v]);

  return (
    <input
      placeholder="Search by customer name or phone"
      value={v}
      onChange={(e) => setV(e.target.value)}
      style={{ flex: 1, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 8 }}
    />
  );
}
