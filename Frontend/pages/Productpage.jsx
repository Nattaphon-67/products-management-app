import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductHeader from "../src/components/ProductHeader";
import { getproducts, deleteproduct } from "../src/services/productsevices";

const Productpage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getproducts();
      setProducts(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setProducts([]);
      setError(err.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return products;

    return products.filter((product) => {
      const haystack =
        `${product.name} ${product.description || ""}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [products, search]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteproduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <main className="min-h-screen bg-black p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl">
        <ProductHeader
          title="Product Management System"
          subtitle="จัดการสินค้าคงคลัง อัปเดตข้อมูลสินค้า และติดตามราคาสินค้าได้อย่างง่ายดาย"
          buttonText="เพิ่มสินค้า"
          onAdd={() => navigate("/addproduct/new")}
        />

        <section className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🔎</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาสินค้า..."
                  className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-400"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => navigate("/addproduct/new")}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
            >
              + เพิ่มสินค้า
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center text-neutral-400">
              กำลังโหลดสินค้า...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl">
                🧾
              </div>
              <h3 className="text-xl font-semibold text-white">ไม่พบสินค้า</h3>
              <p className="mt-2 max-w-md text-sm text-neutral-400">
                ยังไม่มีสินค้าในระบบ กรุณาเพิ่มสินค้าชิ้นแรกเพื่อเริ่มต้น
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-separate border-spacing-y-2 text-left text-sm text-white">
                <thead>
                  <tr className="text-neutral-400">
                    <th className="px-3 py-2 font-semibold">รูปภาพ</th>
                    <th className="px-3 py-2 font-semibold">ชื่อสินค้า</th>
                    <th className="px-3 py-2 font-semibold">รายละเอียด</th>
                    <th className="px-3 py-2 font-semibold">ราคา</th>
                    <th className="px-3 py-2 font-semibold text-center">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="rounded-xl border border-white/10 bg-white/5"
                    >
                      <td className="rounded-l-xl px-3 py-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-xl text-white">
                            📦
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 font-medium text-white">
                        {product.name}
                      </td>
                      <td className="px-3 py-3 text-neutral-300">
                        {product.description || "ไม่มีรายละเอียด"}
                      </td>
                      <td className="px-3 py-3 font-semibold text-blue-400">
                        ฿
                        {Number(product.price).toLocaleString("th-TH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="rounded-r-xl px-3 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/editproduct/${product.id}`)
                            }
                            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                          >
                            แก้ไข
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                          >
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Productpage;
