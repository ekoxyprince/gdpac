import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../api";
import Chart from "chart.js/auto";
import DashboardLayout from "./DashboardLayout";
import UploadDatasetModal from "./UploadDatasetModal";

const GPIDashboard = () => {
  const [states, setStates] = useState([]);
  const [gpiRecords, setGpiRecords] = useState([]);
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
        const [statesRes, gpiRes] = await Promise.all([
          api.get("/states"),
          api.get("/gpi"),
        ]);
        const statesData = statesRes.data || [];
        const gpiData = gpiRes.data || [];

        setStates(statesData);
        setGpiRecords(gpiData);

        if (gpiData.length) {
          const years = Array.from(new Set(gpiData.map((r) => r.year))).sort();
          const latestYear = years[years.length - 1];
          setSelectedYear(String(latestYear));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load GPI analytics data from the server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const years = useMemo(
    () =>
      Array.from(new Set(gpiRecords.map((r) => r.year)))
        .sort()
        .map((y) => String(y)),
    [gpiRecords]
  );

  const stateNameById = useMemo(() => {
    const map = new Map();
    states.forEach((s) => map.set(s.id, s.name));
    return map;
  }, [states]);

  const yearRows = useMemo(() => {
    if (!selectedYear) return [];
    const y = Number(selectedYear);
    return gpiRecords
      .filter((r) => r.year === y)
      .sort((a, b) => a.stateId - b.stateId);
  }, [selectedYear, gpiRecords]);

  useEffect(() => {
    if (!chartCanvasRef.current) return;
    if (!yearRows.length) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: yearRows.map((r) => stateNameById.get(r.stateId) || `State ${r.stateId}`),
        datasets: [
          {
            label: "Total governance score (GPI)",
            data: yearRows.map((r) => r.totalScore ?? null),
            backgroundColor: "rgba(37,99,235,0.7)",
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
  }, [yearRows, stateNameById]);

  if (loading) {
    return (
      <DashboardLayout title="GPI Governance" subtitle="Loading Governance Performance Index data across Nigerian states.">
        <div className="text-blue-900 text-sm">Loading GPI analytics dashboard…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="GPI Governance" subtitle="An error occurred while loading GPI data.">
        <div className="text-red-600 font-medium text-sm">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="GPI Governance"
      subtitle="Explore Governance Performance Index scores and governance pillars across states."
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
            GPI total score by state ({selectedYear || "…"})
          </h3>
          {!selectedYear || !yearRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year with available data to see the chart.
            </div>
          ) : (
            <canvas ref={chartCanvasRef} className="w-full h-64" />
          )}
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow border p-4 overflow-auto text-sm md:text-base">
          <h3 className="font-semibold mb-2 text-blue-800">
            Governance sub-dimensions ({selectedYear || "…"})
          </h3>
          {!selectedYear || !yearRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year to see detailed governance metrics.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="border px-2 py-1 text-left">State</th>
                  <th className="border px-2 py-1 text-right">Infra</th>
                  <th className="border px-2 py-1 text-right">Transp.</th>
                  <th className="border px-2 py-1 text-right">Civic part.</th>
                  <th className="border px-2 py-1 text-right">Fin. mgmt</th>
                  <th className="border px-2 py-1 text-right">Rule of law</th>
                  <th className="border px-2 py-1 text-right">Inst. trust</th>
                  <th className="border px-2 py-1 text-right">GPI</th>
                </tr>
              </thead>
              <tbody>
                {yearRows.map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-blue-50/40">
                    <td className="border px-2 py-1">
                      {stateNameById.get(r.stateId) || `State ${r.stateId}`}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.infrastructure != null ? r.infrastructure.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.transparency != null ? r.transparency.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.civicParticipation != null
                        ? r.civicParticipation.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.financialMgmt != null ? r.financialMgmt.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.ruleOfLaw != null ? r.ruleOfLaw.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.institutionalTrust != null
                        ? r.institutionalTrust.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right font-semibold">
                      {r.totalScore != null ? r.totalScore.toFixed(3) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <UploadDatasetModal
        indexType="GPI"
        open={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </DashboardLayout>
  );
};

export default GPIDashboard;
