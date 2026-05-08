import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";

export function meta() {
  return [
    { title: "Manajemen Negara - Shartinary Admin" },
    { name: "description", content: "Kelola daftar negara di Shartinary." },
  ];
}

import CountryList from "../components/admin/country/CountryList";
import CountryModal from "../components/admin/country/CountryModal";
import CountryForm from "../components/admin/country/CountryForm";
import { useCountry } from "../contexts/CountryContext";

export default function AdminCountries() {
  const { countries, loading, addCountry, editCountry, removeCountry } = useCountry();

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedCountry(null);
    setIsModalOpen(true);
  };

  const handleEdit = (country) => {
    setModalMode("edit");
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addCountry(formData);
    } else {
      result = await editCountry(selectedCountry.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      {/* List View */}
      <CountryList
        data={countries}
        isLoading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={removeCountry}
      />

      {/* Add/Edit Modal */}
      <CountryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Negara Baru" : "Edit Data Negara"}
      >
        <CountryForm
          initialData={selectedCountry}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      </CountryModal>
    </AdminLayout>
  );
}
