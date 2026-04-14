"use client";

const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10 per page" },
  { value: "25", label: "25 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
];

export default function PageSizeSelect({ value, onChange }) {
  return (
    <div>
      <select
        className="px-3 py-2 text-sm border border-base-content/20 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        value={value || "10"}
        onChange={(e) => onChange(e.target.value)}
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
