import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../api";
import Chart from "chart.js/auto";
import DashboardLayout from "./DashboardLayout";
import UploadDatasetModal from "./UploadDatasetModal";

const StateComparison = () => {
  const [states, setStates] = useState([]);
  const [sedi, setSedi] = useState([]);
  const [gpi, setGpi] = useState([]);
  const [iei, setIei] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const [statesRes, sediRes, gpiRes, ieiRes] = await Promise.all([
          api.get("/states"),
          api.get("/sedi"),
          api.get("/gpi"),
          api.get("/iei"),
        ]);

        const statesData = statesRes.data || [];
        const sediData = sediRes.data || [];
        const gpiData = gpiRes.data || [];
        const ieiData = ieiRes.data || [];

        setStates(statesData);
        setSedi(sediData);
        setGpi(gpiData);
        setIei(ieiData);

        const years = Array.from(
          new Set([
            ...sediData.map((r) => r.year),
            ...gpiData.map((r) => r.year),
            ...ieiData.map((r) => r.year),
          ])
        ).sort();
        if (years.length) {
          setSelectedYear(String(years[years.length - 1]));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load comparison data from the server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const years = useMemo(() => {
    const allYears = [
      ...sedi.map((r) => r.year),
      ...gpi.map((r) => r.year),
      ...iei.map((r) => r.year),
    ];
    return Array.from(new Set(allYears))
      .sort()
      .map((y) => String(y));
  }, [sedi, gpi, iei]);

  const combinedRows = useMemo(() => {
    if (!selectedYear) return [];
    const y = Number(selectedYear);

    const sediByState = new Map();
    const gpiByState = new Map();
    const ieiByState = new Map();

    sedi
      .filter((r) => r.year === y)
      .forEach((r) => sediByState.set(r.stateId, r));
    gpi
      .filter((r) => r.year === y)
      .forEach((r) => gpiByState.set(r.stateId, r));
    iei
      .filter((r) => r.year === y)
      .forEach((r) => ieiByState.set(r.stateId, r));

    return states.map((s) => {
      const sediRow = sediByState.get(s.id);
      const gpiRow = gpiByState.get(s.id);
      const ieiRow = ieiByState.get(s.id);

      return {
        stateId: s.id,
        stateName: s.name,
        sedi: sediRow?.sdiComposite ?? null,
        gpi: gpiRow?.totalScore ?? null,
        iei: ieiRow?.totalScore ?? null,
      };
    });
  }, [selectedYear, states, sedi, gpi, iei]);

  useEffect(() => {
    if (!chartCanvasRef.current) return;
    if (!combinedRows.length) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: combinedRows.map((r) => r.stateName),
        datasets: [
          {
            label: "SEDI",
            data: combinedRows.map((r) => r.sedi),
            backgroundColor: "rgba(34,197,94,0.9)",
          },
          {
            label: "GPI",
            data: combinedRows.map((r) => r.gpi),
            backgroundColor: "rgba(37,99,235,0.85)",
          },
          {
            label: "IEI",
            data: combinedRows.map((r) => r.iei),
            backgroundColor: "rgba(16,185,129,0.8)",
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
            ticks: { stepSize: 0.1 },
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
  }, [combinedRows]);

  if (loading) {
    return (
      <DashboardLayout title="State Comparison" subtitle="Loading cross-index state comparison across SEDI, GPI, and IEI.">
        <div className="text-blue-900 text-sm">Loading state comparison dashboard…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="State Comparison" subtitle="An error occurred while loading comparison data.">
        <div className="text-red-600 font-medium text-sm">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="State Comparison"
      subtitle="Compare states across the three core GDPAC indices: SEDI (development), GPI (governance), and IEI (institutional efficiency)."
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
      <div className="bg-white rounded-xl shadow p-4 border inline-block mb-4">
        <label className="block text-sm md:text-base font-semibold text-blue-700 mb-1">
          Year
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

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 bg-white rounded-xl shadow border p-4">
          <h3 className="font-semibold mb-2 text-blue-800 text-base">
            SEDI vs GPI vs IEI by state ({selectedYear || "…"})
          </h3>
          {!selectedYear || !combinedRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year with data to see the chart.
            </div>
          ) : (
            <canvas ref={chartCanvasRef} className="w-full h-64" />
          )}
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow border p-4 overflow-auto text-sm md:text-base">
          <h3 className="font-semibold mb-2 text-blue-800">
            Index scores by state ({selectedYear || "…"})
          </h3>
          {!selectedYear || !combinedRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year to see numeric scores per index.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="border px-2 py-1 text-left">State</th>
                  <th className="border px-2 py-1 text-right">SEDI</th>
                  <th className="border px-2 py-1 text-right">GPI</th>
                  <th className="border px-2 py-1 text-right">IEI</th>
                </tr>
              </thead>
              <tbody>
                {combinedRows.map((r) => (
                  <tr key={r.stateId} className="odd:bg-white even:bg-blue-50/40">
                    <td className="border px-2 py-1">{r.stateName}</td>
                    <td className="border px-2 py-1 text-right">
                      {r.sedi != null ? r.sedi.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.gpi != null ? r.gpi.toFixed(3) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.iei != null ? r.iei.toFixed(3) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <UploadDatasetModal
        indexType="COMPARISON"
        open={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </DashboardLayout>
  );
};

export default StateComparison;
