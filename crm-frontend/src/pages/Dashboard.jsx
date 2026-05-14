import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Lead",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, form);
      } else {
        await api.post("/customers", form);
      }
      setForm({ name: "", email: "", phone: "", company: "", status: "Lead" });
      setEditingId(null);
      fetchCustomers();
    } catch (error) {
      console.error("Failed to save customer:", error);
      alert(error.response?.data?.message || "Failed to save customer");
    }
  };

  const handleEdit = (customer) => {
    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      company: customer.company || "",
      status: customer.status || "Lead",
    });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this customer?")) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              CRM Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Manage your business relationships efficiently.
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all px-6 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>

        {/* Customer Form */}
        <div className="bg-[#1e293b] border border-slate-700 p-8 rounded-2xl shadow-2xl mb-10">
          <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
            <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
            {editingId ? "Update Customer" : "Add New Customer"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl transition-all"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              required
              className="bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl transition-all"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              className="bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl transition-all"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <select
              className="bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl transition-all appearance-none"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Customer">Customer</option>
            </select>
            <button
              type="submit"
              className={`py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg ${
                editingId
                  ? "bg-amber-500 hover:bg-amber-600 text-black"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {editingId ? "Update Record" : "Create Entry"}
            </button>
          </form>
        </div>

        {/* Customer List */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#334155]/50 text-slate-300 uppercase text-xs tracking-wider">
                  <th className="p-5 font-semibold">Name</th>
                  <th className="p-5 font-semibold">Email</th>
                  <th className="p-5 font-semibold">Phone</th>
                  <th className="p-5 font-semibold">Company</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {customers.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="p-5 font-medium text-white">{c.name}</td>
                    <td className="p-5">
                      <div className="text-sm">{c.email}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-xs text-slate-500">{c.phone}</div>
                    </td>
                    <td className="p-5 text-slate-400">{c.company || "—"}</td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          c.status === "Customer"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : c.status === "Prospect"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-slate-500/10 text-slate-400"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-amber-500 hover:text-amber-400 font-semibold text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-rose-500 hover:text-rose-400 font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {customers.length === 0 && (
            <div className="p-20 text-center text-slate-500">
              No customers found. Start by adding one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
