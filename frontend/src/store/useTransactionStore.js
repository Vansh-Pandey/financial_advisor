import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  // Fetch all transactions
  fetchTransactions: async () => {
    set({ isFetching: true, error: null });
    try {
      const res = await axiosInstance.get("/transactions");
      set({ transactions: res.data });
      return res.data;
    } catch (error) {
      console.error("Fetch transactions error:", error);
      set({ error: error.response?.data?.message || "Failed to fetch transactions" });
      toast.error(error.response?.data?.message || "Failed to load transactions", { autoClose: 1000 });
    } finally {
      set({ isFetching: false });
    }
  },

  // Create new transaction
  createTransaction: async (transactionData) => {
    set({ isCreating: true, error: null });
    try {
      const res = await axiosInstance.post("/transactions", transactionData);
      set((state) => ({
        transactions: [res.data, ...state.transactions],
      }));
      toast.success("Transaction created successfully", { autoClose: 1000 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.data;
    } catch (error) {
      console.error("Create transaction error:", error);
      set({ error: error.response?.data?.message || "Failed to create transaction" });
      toast.error(error.response?.data?.message || "Failed to create transaction", { autoClose: 1000 });
      throw error;
    } finally {
      set({ isCreating: false });
    }
  },

  // Update transaction
  updateTransaction: async (id, updateData) => {
    set({ isUpdating: true, error: null });
    try {
      const res = await axiosInstance.put(`/transactions/${id}`, updateData);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t._id === id ? res.data : t
        ),
      }));
      toast.success("Transaction updated successfully", { autoClose: 1000 });
      return res.data;
    } catch (error) {
      console.error("Update transaction error:", error);
      set({ error: error.response?.data?.message || "Failed to update transaction" });
      toast.error(error.response?.data?.message || "Failed to update transaction", { autoClose: 1000 });
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    set({ isDeleting: true, error: null });
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
      toast.success("Transaction deleted successfully", { autoClose: 1000 });
    } catch (error) {
      console.error("Delete transaction error:", error);
      set({ error: error.response?.data?.message || "Failed to delete transaction" });
      toast.error(error.response?.data?.message || "Failed to delete transaction", { autoClose: 1000 });
      throw error;
    } finally {
      set({ isDeleting: false });
    }
  },

  // Get transaction by ID
  getTransactionById: (id) => {
    return get().transactions.find((t) => t._id === id);
  },

  // Get recent transactions (last 5)
  getRecentTransactions: () => {
    return get().transactions.slice(0, 5);
  },

  // Get transactions by type
  getTransactionsByType: (type) => {
    return get().transactions.filter((t) => t.action === type);
  },
}));