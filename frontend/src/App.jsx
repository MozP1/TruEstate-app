import React from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SortSelect from "./components/SortSelect.jsx";
import TransactionTable from "./components/TransactionTable.jsx";
import Pagination from "./components/Pagination.jsx";
import { useQueryParams } from "./hooks/useQueryParams.js";
import { fetchSales } from "./services/api.js";

export default function App() {
  const [params, setParam] = useQueryParams({ q: "", sort: "date", order: "desc", page: 1 });
  const [data, setData] = React.useState({ items: [], page: 1, pageSize: 10, total: 0 });

  React.useEffect(() => {
    let cancelled = false;
    fetchSales(params).then((res) => {
      if (!cancelled) setData(res);
    });
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(params)]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "16px", padding: "16px", fontFamily: "system-ui" }}>
      <aside>
        <FilterPanel params={params} setParam={setParam} />
      </aside>
      <main>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
          <SearchBar value={params.q} onChange={(v) => setParam("q", v)} />
          <SortSelect
            sort={params.sort}
            order={params.order}
            onChange={(s, o) => {
              setParam("sort", s);
              setParam("order", o);
            }}
          />
        </div>
        <TransactionTable rows={data.items} />
        <Pagination
          page={Number(params.page) || 1}
          pageSize={data.pageSize}
          total={data.total}
          onPageChange={(p) => setParam("page", p)}
        />
      </main>
    </div>
  );
}
