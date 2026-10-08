import React from "react";

function ProductHeader({ title, subtitle, buttonText, onAdd }) {
  return (
    <header className="rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-sm ring-1 ring-white/10">
            🧾
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
              Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {title}
            </h1>
          </div>
        </div>

        {buttonText && (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
          >
            {buttonText}
          </button>
        )}
      </div>

      {subtitle && (
        <p className="mt-4 text-sm text-neutral-300 sm:text-base">{subtitle}</p>
      )}
    </header>
  );
}

export default ProductHeader;
