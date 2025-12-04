import React, { useState } from "react";
import api from "../../api";

const UploadDatasetModal = ({ indexType, open, onClose, onUploaded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a CSV or Excel file.");
      return;
    }
    setSubmitting(true);
    setStatus("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("indexType", indexType);
      formData.append("title", title);
      formData.append("description", description);

      const res = await api.post("/uploads/dataset", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus(
        `Uploaded ${res.data?.summary?.numRecordsCreated || 0} records for ${indexType}.`
      );
      onUploaded && onUploaded(res.data);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Please check file format and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Upload {indexType} dataset
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          Upload a CSV or Excel file to populate the {indexType} table. Ensure
          your file includes at least <span className="font-semibold">stateId</span> and
          <span className="font-semibold"> year</span> columns.
        </p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[0.7rem] font-semibold text-slate-700 mb-1">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="e.g. SEDI Data Pack 2023"
            />
          </div>
          <div>
            <label className="block text-[0.7rem] font-semibold text-slate-700 mb-1">
              Description (optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              placeholder="Short description of the data source, coverage, and methodology."
            />
          </div>
          <div>
            <label className="block text-[0.7rem] font-semibold text-slate-700 mb-1">
              File (CSV or Excel)
            </label>
            <input
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs"
            />
            <p className="text-[0.65rem] text-slate-500 mt-1">
              Supported formats: CSV, XLSX. Columns: stateId, year, and index-specific
              metrics (e.g. sdiComposite, totalScore).
            </p>
          </div>
          {status && (
            <div className="text-[0.7rem] text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
              {status}
            </div>
          )}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-1.5 text-xs rounded-md bg-emerald-600 text-white font-semibold disabled:opacity-50 hover:bg-emerald-700"
            >
              {submitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDatasetModal;
