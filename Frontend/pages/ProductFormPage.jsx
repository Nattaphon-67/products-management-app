function ProductFormPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <h1 className="text-2xl font-bold text-neutral-900">Page Not Found</h1>
        <p className="mt-3 text-sm text-neutral-600">
          The page you requested does not exist.
        </p>
        <button
          type="button"
          onClick={() => window.location.assign("/productpage")}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}

export default ProductFormPage;
