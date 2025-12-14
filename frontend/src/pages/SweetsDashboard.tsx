import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllSweets,
  purchaseSweet,
  addSweet,
  deleteSweet,
} from "../api/sweets";

type Sweet = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

// 🔹 Decode JWT
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const SweetsDashboard = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const isAdmin = user?.role === "admin";

  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 ADMIN FORM STATE
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const fetchSweets = async () => {
    try {
      const data = await getAllSweets();
      setSweets(data);
    } catch {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: string) => {
    try {
      await purchaseSweet(id);
      fetchSweets();
    } catch {
      alert("Purchase failed");
    }
  };

  // 🔹 ADMIN: ADD SWEET
  const handleAddSweet = async () => {
    try {
      await addSweet({ name, category, price, quantity });
      setName("");
      setCategory("");
      setPrice(0);
      setQuantity(0);
      fetchSweets();
    } catch {
      alert("Add sweet failed");
    }
  };

  // 🔹 ADMIN: DELETE SWEET
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sweet?")) return;
    try {
      await deleteSweet(id);
      fetchSweets();
    } catch {
      alert("Delete failed");
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  if (loading) return <p>Loading sweets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <button onClick={logout}>Logout</button>
      <p>Logged in as <b>{user?.role}</b></p>

      <h2>🍬 Sweet Shop</h2>

      {/* 🔹 ADMIN ADD FORM */}
      {isAdmin && (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
          <h3>Add Sweet (Admin)</h3>

          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <br /><br />

          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          <br /><br />

          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(+e.target.value)} />
          <br /><br />

          <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(+e.target.value)} />
          <br /><br />

          <button onClick={handleAddSweet}>Add Sweet</button>
        </div>
      )}

      {/* SWEETS LIST */}
      {sweets.map((sweet) => (
        <div
          key={sweet._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <h3>{sweet.name}</h3>
          <p>Category: {sweet.category}</p>
          <p>Price: ₹{sweet.price}</p>
          <p>Stock: {sweet.quantity}</p>

          {!isAdmin && (
            <button
              disabled={sweet.quantity === 0}
              onClick={() => handlePurchase(sweet._id)}
            >
              {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
            </button>
          )}

          {isAdmin && (
            <button
              style={{ background: "red", color: "white" }}
              onClick={() => handleDelete(sweet._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SweetsDashboard;
