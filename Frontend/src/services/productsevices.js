const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const request = async (URL, options) => {
  const response = await fetch(URL, options);
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Something went wrong");
    }
    return response.json();
};

const getproducts = () => {
  return request(API_URL, {
    method: "GET",
  });
}

const getproduct = (id) => request (`${API_URL}/${id}`, {
  method: "GET",
});

const creatproduct = (product) => request(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(product),
});

const deleteproduct = (id) => request(`${API_URL}/${id}`, {
  method: "DELETE",
});

export { getproducts, getproduct, creatproduct, deleteproduct };