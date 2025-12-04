import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../api";
import Chart from "chart.js/auto";
import DashboardLayout from "./DashboardLayout";
import UploadDatasetModal from "./UploadDatasetModal";

const IEIDashboard = () => {
  const [states, setStates] = useState([]);
  const [ieiRecords, setIeiRecords] = useState([]);
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
        const [statesRes, ieiRes] = await Promise.all([
          api.get("/states"),
          api.get("/iei"),
        ]);
        const statesData = statesRes.data || [];
        const ieiData = ieiRes.data || [];

        setStates(statesData);
        setIeiRecords(ieiData);

        if (ieiData.length) {
          const years = Array.from(new Set(ieiData.map((r) => r.year))).sort();
          const latestYear = years[years.length - 1];
          setSelectedYear(String(latestYear));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load IEI analytics data from the server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const years = useMemo(
    () =>
      Array.from(new Set(ieiRecords.map((r) => r.year)))
        .sort()
        .map((y) => String(y)),
    [ieiRecords]
  );

  const stateNameById = useMemo(() => {
    const map = new Map();
    states.forEach((s) => map.set(s.id, s.name));
    return map;
  }, [states]);

  const yearRows = useMemo(() => {
    if (!selectedYear) return [];
    const y = Number(selectedYear);
    return ieiRecords
      .filter((r) => r.year === y)
      .sort((a, b) => a.stateId - b.stateId);
  }, [selectedYear, ieiRecords]);

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
            label: "Institutional efficiency score (IEI)",
            data: yearRows.map((r) => r.totalScore ?? null),
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
  }, [yearRows, stateNameById]);

  if (loading) {
    return (
      <DashboardLayout title="IEI Efficiency" subtitle="Loading Institutional Efficiency Index data across Nigerian states.">
        <div className="text-blue-900 text-sm">Loading IEI analytics dashboard…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="IEI Efficiency" subtitle="An error occurred while loading IEI data.">
        <div className="text-red-600 font-medium text-sm">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="IEI Efficiency"
      subtitle="Assess institutional efficiency, service delivery, and compliance across states."
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
            IEI total score by state ({selectedYear || "…"})
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
            Institutional efficiency dimensions ({selectedYear || "…"})
          </h3>
          {!selectedYear || !yearRows.length ? (
            <div className="text-sm text-gray-500">
              Select a year to see detailed IEI metrics.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="border px-2 py-1 text-left">State</th>
                  <th className="border px-2 py-1 text-right">Budget exec.</th>
                  <th className="border px-2 py-1 text-right">Service del.</th>
                  <th className="border px-2 py-1 text-right">Compliance</th>
                  <th className="border px-2 py-1 text-right">Stakeholder sat.</th>
                  <th className="border px-2 py-1 text-right">Feedback</th>
                  <th className="border px-2 py-1 text-right">IEI</th>
                </tr>
              </thead>
              <tbody>
                {yearRows.map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-blue-50/40">
                    <td className="border px-2 py-1">
                      {stateNameById.get(r.stateId) || `State ${r.stateId}`}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.budgetExecution != null
                        ? r.budgetExecution.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.serviceDelivery != null
                        ? r.serviceDelivery.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.compliance != null ? r.compliance.toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.stakeholderSatisfaction != null
                        ? r.stakeholderSatisfaction.toFixed(2)
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {r.feedbackScore != null ? r.feedbackScore.toFixed(2) : "-"}
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
        indexType="IEI"
        open={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </DashboardLayout>
  );
};

export default IEIDashboard;
