import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AddItem from "./pages/AddItem";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="add" element={<AddItem />} />
        <Route path="list" element={<ListItems />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}