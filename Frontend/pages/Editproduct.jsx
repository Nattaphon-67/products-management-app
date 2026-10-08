import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getproduct, updateProduct } from "../src/services/productsevices";

const Editproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getproduct(id);
        setForm({
          name: product.name || "",
          price: String(product.price || ""),
          description: product.description || "",
          image: product.image || "",
        });
      } catch (err) {
        setError(err.message || "Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateProduct(id, {
        ...form,
        price: Number(form.price),
      });
      navigate("/productpage");
    } catch (err) {
      setError(err.message || "Unable to update product");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-neutral-400">
        Loading product...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
        <h2 className="mb-5 text-2xl font-bold text-white">Edit Product</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-neutral-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Price
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/productpage")}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Editproduct;
