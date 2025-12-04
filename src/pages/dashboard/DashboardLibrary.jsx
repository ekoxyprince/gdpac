import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import api from "../../api";

const DashboardLibrary = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [indexFilter, setIndexFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/uploads");
        setUploads(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load uploads");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return (uploads || [])
      .filter((u) =>
        indexFilter === "ALL" ? true : u.indexType === indexFilter
      )
      .filter((u) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          (u.title || "").toLowerCase().includes(q) ||
          (u.description || "").toLowerCase().includes(q) ||
          (u.originalName || "").toLowerCase().includes(q)
        );
      });
  }, [uploads, indexFilter, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return (
    <DashboardLayout
      title="Data Library"
      subtitle="Browse uploaded datasets, visual packs, and score files used to power GDPAC dashboards."
    >
      <div className="bg-white rounded-xl border shadow-sm p-4 mb-4 text-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="space-y-1">
            <label className="text-[0.7rem] font-semibold text-slate-700">
              Search
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">🔍</span>
              <input
                value={query}
                onChange={(e) => {
                  setPage(1);
                  setQuery(e.target.value);
                }}
                className="flex-1 border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Enter keyword or title (e.g. SEDI Data Pack 2023)"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[0.7rem] font-semibold text-slate-700">
              Filter by index
            </label>
            <select
              value={indexFilter}
              onChange={(e) => {
                setPage(1);
                setIndexFilter(e.target.value);
              }}
              className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="ALL">All indices</option>
              <option value="SEDI">SEDI</option>
              <option value="GPI">GPI</option>
              <option value="IEI">IEI</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-slate-700">Loading uploads…</div>
      )}
      {error && !loading && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl border shadow-sm p-4 text-xs md:text-sm overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800">
                <th className="border px-2 py-1 text-left">Title</th>
                <th className="border px-2 py-1 text-left">File</th>
                <th className="border px-2 py-1 text-left">Index</th>
                <th className="border px-2 py-1 text-right">Records</th>
                <th className="border px-2 py-1 text-left">Uploaded</th>
                <th className="border px-2 py-1 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((u) => (
                <tr key={u.id} className="odd:bg-white even:bg-slate-50/40">
                  <td className="border px-2 py-1 align-top">
                    {u.title || u.originalName || `Upload #${u.id}`}
                  </td>
                  <td className="border px-2 py-1 align-top text-slate-700">
                    <div className="flex flex-col">
                      <span>{u.originalName}</span>
                      <span className="text-[0.65rem] text-slate-500">
                        {u.fileType}
                      </span>
                    </div>
                  </td>
                  <td className="border px-2 py-1 align-top">{u.indexType}</td>
                  <td className="border px-2 py-1 align-top text-right">
                    {u.numRecords}
                  </td>
                  <td className="border px-2 py-1 align-top text-slate-700">
                    {u.uploadedAt ? new Date(u.uploadedAt).toLocaleDateString() : ""}
                  </td>
                  <td className="border px-2 py-1 align-top text-slate-700">
                    {u.description || "—"}
                  </td>
                </tr>
              ))}
              {!paged.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="border px-2 py-3 text-center text-slate-500"
                  >
                    No datasets match your filters yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pageCount > 1 && (
            <div className="flex items-center justify-between mt-3 text-xs md:text-sm text-slate-600">
              <span>
                Page {page} of {pageCount}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 border rounded disabled:opacity-40 bg-white hover:bg-slate-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="px-2 py-1 border rounded disabled:opacity-40 bg-white hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardLibrary;
