import React from "react";
import { setParamList, getParamList } from "../hooks/useQueryParams";

function CheckboxGroup({ label, options, values, onToggle }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label key={opt} style={{ display: "block", margin: "6px 0" }}>
            <input type="checkbox" checked={checked} onChange={() => onToggle(opt, !checked)} /> {opt}
          </label>
        );
      })}
    </div>
  );
}

export default function FilterPanel({ params, setParam }) {
  const region = getParamList(params.region);
  const gender = getParamList(params.gender);
  const category = getParamList(params.category);
  const payment = getParamList(params.payment);

  const toggle = (key) => (val, add) => {
    const next = setParamList(getParamList(params[key]), val, add);
    setParam(key, next);
    setParam("page", 1); // reset to first page on filter change
  };

  return (
    <div>
      <h3 style={{ margin: "8px 0 12px" }}>Filters</h3>

      <CheckboxGroup
        label="Region"
        options={["North", "South", "East", "West", "Central"]}
        values={region}
        onToggle={toggle("region")}
      />

      <CheckboxGroup
        label="Gender"
        options={["Male", "Female", "Other"]}
        values={gender}
        onToggle={toggle("gender")}
      />

      <CheckboxGroup
        label="Category"
        options={["Electronics", "Clothing", "Home", "Grocery", "Sports"]}
        values={category}
        onToggle={toggle("category")}
      />

      <CheckboxGroup
        label="Payment"
        options={["Card", "Cash", "UPI", "Wallet"]}
        values={payment}
        onToggle={toggle("payment")}
      />

      <button
        onClick={() =>
          ["region", "gender", "category", "payment", "age_min", "age_max", "date_from", "date_to", "tag"].forEach(
            (k) => setParam(k, undefined)
          )
        }
      >
        Reset filters
      </button>
    </div>
  );
}
