import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import CategoryList from "../components/admin/category/CategoryList";
import CategoryForm from "../components/admin/category/CategoryForm";
import AdminModal from "../components/admin/country/CountryModal"; // Reusing the modal
import { useCategory } from "../contexts/CategoryContext";

export function meta() {
  return [
    { title: "Manajemen Kategori - Shartinary Admin" },
    { name: "description", content: "Kelola kategori destinasi dan POI." },
  ];
}

export default function AdminCategories() {
  const { categories, loading, addCategory, editCategory, removeCategory } = useCategory();
  
  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addCategory(formData);
    } else {
      result = await editCategory(selectedCategory.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <CategoryList 
        data={categories} 
        isLoading={loading} 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={removeCategory}
      />

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Kategori Baru" : "Edit Data Kategori"}
      >
        <CategoryForm 
          initialData={selectedCategory}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      </AdminModal>
    </AdminLayout>
  );
}
