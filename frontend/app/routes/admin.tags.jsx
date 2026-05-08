import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import TagList from "../components/admin/tag/TagList";
import TagForm from "../components/admin/tag/TagForm";
import AdminModal from "../components/admin/country/CountryModal"; // Reusing the modal
import { useTag } from "../contexts/TagContext";

export function meta() {
  return [
    { title: "Manajemen Tags - Shartinary Admin" },
    { name: "description", content: "Kelola filter pencarian itinerary." },
  ];
}

export default function AdminTags() {
  const { tags, loading, addTag, editTag, removeTag } = useTag();
  
  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedTag, setSelectedTag] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedTag(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tag) => {
    setModalMode("edit");
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addTag(formData);
    } else {
      result = await editTag(selectedTag.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <TagList 
        data={tags} 
        isLoading={loading} 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={removeTag}
      />

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Tag Baru" : "Edit Data Tag"}
      >
        <TagForm 
          initialData={selectedTag}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      </AdminModal>
    </AdminLayout>
  );
}
