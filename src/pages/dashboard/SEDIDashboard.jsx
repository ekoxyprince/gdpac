import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../api";
import Chart from "chart.js/auto";
import DashboardLayout from "./DashboardLayout";
import UploadDatasetModal from "./UploadDatasetModal";

const SEDIDashboard = () => {
  const [states, setStates] = useState([]);
  const [sediRecords, setSediRecords] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const [statesRes, sediRes] = await Promise.all([
          api.get("/states"),
          api.get("/sedi"),
        ]);

        const statesData = statesRes.data || [];
        const sediData = sediRes.data || [];

        setStates(statesData);
        setSediRecords(sediData);

        if (statesData.length && sediData.length) {
          const years = Array.from(new Set(sediData.map((r) => r.year))).sort();
          const latestYear = years[years.length - 1];
          setSelectedYear(String(latestYear));
          setSelectedStateId(String(statesData[0].id));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load SEDI analytics data from the server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const years = useMemo(
    () =>
      Array.from(new Set(sediRecords.map((r) => r.year)))
        .sort()
        .map((y) => String(y)),
    [sediRecords]
  );

  const stateNameById = useMemo(() => {
    const map = new Map();
    states.forEach((s) => map.set(s.id, s.name));
    return map;
  }, [states]);

  const stateSeries = useMemo(() => {
    if (!selectedStateId) return { labels: [], data: [] };
    const sid = Number(selectedStateId);
    const rows = sediRecords
      .filter((r) => r.stateId === sid)
      .sort((a, b) => a.year - b.year);
    return {
      labels: rows.map((r) => r.year),
      data: rows.map((r) => r.sdiComposite ?? null),
    };
  }, [selectedStateId, sediRecords]);

  const yearRows = useMemo(() => {
    if (!selectedYear) return [];
    const y = Number(selectedYear);
    return sediRecords
      .filter((r) => r.year === y)
      .sort((a, b) => a.stateId - b.stateId);
  }, [selectedYear, sediRecords]);

  const pagedYearRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return yearRows.slice(start, start + pageSize);
  }, [page, pageSize, yearRows]);

  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(yearRows.length / pageSize));
  }, [yearRows.length, pageSize]);

  useEffect(() => {
    if (!chartCanvasRef.current) return;

    const { labels, data } = stateSeries;
    if (!labels.length) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "SEDI composite score",
            data,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.15)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            min: 0,
            max: 1,
            ticks: {
              stepSize: 0.1,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [stateSeries]);

  if (loading) {
    return (
      <DashboardLayout title="SEDI Analytics" subtitle="Loading Socioeconomic Development Index data across Nigerian states.">
        <div className="text-blue-900 text-sm">Loading SEDI analytics dashboard…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="SEDI Analytics" subtitle="An error occurred while loading SEDI data.">
        <div className="text-red-600 font-medium text-sm">{error}</div>
      </DashboardLayout>
    );
  }

  const totalStates = yearRows.length;
  const avgSEDI = yearRows.length
    ? yearRows.reduce((sum, r) => sum + (r.sdiComposite || 0), 0) / yearRows.length
    : null;

  return (
    <DashboardLayout
      title="SEDI Analytics"
      subtitle="Upload and explore Socioeconomic Development Index (SEDI) data by state, year, and dimension."
      actions={
        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
        >
          + Upload dataset
        </button>
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="sedi-kpi-card sedi-kpi-card--year rounded-2xl border shadow-lg p-4 text-sm md:text-base relative overflow-hidden">
          <div className="text-xs md:text-sm uppercase tracking-wide text-emerald-100 mb-1">
            Selected year
          </div>
          <div className="text-lg font-semibold text-white">
            {selectedYear || "—"}
          </div>
          <div className="text-xs md:text-sm text-emerald-50 mt-1">
            Change year to compare trends.
          </div>
        </div>
        <div className="sedi-kpi-card sedi-kpi-card--states rounded-2xl border shadow-lg p-4 text-sm md:text-base relative overflow-hidden">
          <div className="text-xs md:text-sm uppercase tracking-wide text-sky-100 mb-1">
            States in dataset
          </div>
          <div className="text-lg font-semibold text-white">{totalStates}</div>
          <div className="text-xs md:text-sm text-sky-50 mt-1">
            Number of states with SEDI records for the selected year.
          </div>
        </div>
        <div className="sedi-kpi-card sedi-kpi-card--avg rounded-2xl border shadow-lg p-4 text-sm md:text-base relative overflow-hidden">
          <div className="text-xs md:text-sm uppercase tracking-wide text-amber-100 mb-1">
            Avg SEDI (selected year)
          </div>
          <div className="text-lg font-semibold text-white">
            {avgSEDI != null ? avgSEDI.toFixed(2) : "—"}
          </div>
          <div className="text-xs md:text-sm text-amber-50 mt-1">
            Mean composite score across all states in view.
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end bg-white rounded-xl shadow p-4 border mb-4">
        <div>
          <label className="block text-sm md:text-base font-semibold text-blue-700 mb-1">
            State (time-series)
          </label>
          <select
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm min-w-[10rem]"
          >
            <option value="" disabled>
              Select a state
            </option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm md:text-base font-semibold text-blue-700 mb-1">
            Year (cross-state comparison)
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm min-w-[6rem]"
          >
            <option value="" disabled>
              Select year
            </option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 bg-white rounded-xl shadow border p-4">
          <h3 className="font-semibold mb-2 text-blue-800 text-base">
            SEDI composite over time {selectedStateId && "for "}
            {selectedStateId && stateNameById.get(Number(selectedStateId))}
          </h3>
          {!stateSeries.labels.length ? (
            <div className="text-sm text-gray-500">
              No SEDI time-series data available for this state yet.
            </div>
          ) : (
            <canvas ref={chartCanvasRef} className="w-full h-64" />
          )}
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow border p-4 overflow-auto text-sm md:text-base">
          <h3 className="font-semibold mb-2 text-blue-800">
            Cross-state SEDI metrics for {selectedYear || "…"}
          </h3>
          {!selectedYear || !yearRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year with available data to see a breakdown by state.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="border px-2 py-1 text-left">State</th>
                  <th className="border px-2 py-1 text-right">Poverty %</th>
                  <th className="border px-2 py-1 text-right">Education</th>
                  <th className="border px-2 py-1 text-right">Health</th>
                  <th className="border px-2 py-1 text-right">Living cond.</th>
                  <th className="border px-2 py-1 text-right">SEDI</th>
                </tr>
              </thead>
              <tbody>
                {pagedYearRows.map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-blue-50/40">
                    <td className="border px-2 py-1">
                      {stateNameById.get(r.stateId) || `State ${r.stateId}`}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.povertyRate != null ? `${r.povertyRate.toFixed(1)}%` : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.educationIndex != null
                        ? r.educationIndex.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.healthIndex != null ? r.healthIndex.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.livingConditionIndex != null
                        ? r.livingConditionIndex.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right font-semibold">
                      {r.sdiComposite != null ? r.sdiComposite.toFixed(2) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedYear && yearRows.length > pageSize && (
            <div className="flex items-center justify-between mt-3 text-xs md:text-sm text-slate-600">
              <span>
                Page {page} of {pageCount}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 border rounded disabled:opacity-40 text-xs bg-white hover:bg-slate-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="px-2 py-1 border rounded disabled:opacity-40 text-xs bg-white hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <UploadDatasetModal
        indexType="SEDI"
        open={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </DashboardLayout>
  );
};

export default SEDIDashboard;
