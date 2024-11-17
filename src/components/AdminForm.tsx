'use client';

import { useState } from 'react';

const AdminForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files?: FileList };
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder: Implement image upload and save to Google Sheets API
    alert('Blog submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
        className="border rounded p-2"
        rows={6}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border rounded p-2"
        accept="image/*"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AdminForm;
