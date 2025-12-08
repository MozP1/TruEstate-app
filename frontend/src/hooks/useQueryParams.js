// Keep search/filters/sort/page in the URL so state survives refresh/sharing
import { useEffect, useState } from "react";

export function getParamList(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : String(v).split(",").filter(Boolean);
}
export function setParamList(curr, val, add) {
  const s = new Set(curr);
  if (add) s.add(val);
  else s.delete(val);
  return Array.from(s);
}

export function useQueryParams(defaults = {}) {
  const parse = () => {
    const p = new URLSearchParams(window.location.search);
    const obj = { ...defaults };
    for (const [k, v] of p.entries()) {
      if (obj[k] && Array.isArray(obj[k])) obj[k] = p.getAll(k);
      else if (!isNaN(Number(v)) && ["page", "age_min", "age_max"].includes(k)) obj[k] = Number(v);
      else obj[k] = v;
    }
    return obj;
  };

  const [state, setState] = useState(parse());

  useEffect(() => {
    const q = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => {
      if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) return;
      if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
      else q.set(k, v);
    });
    const url = `${window.location.pathname}?${q.toString()}`;
    window.history.replaceState({}, "", url);
  }, [JSON.stringify(state)]);

  const setParam = (key, val) => setState((s) => ({ ...s, [key]: val }));
  return [state, setParam];
}
