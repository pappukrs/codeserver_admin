import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBold, FaFont, FaPalette } from 'react-icons/fa';
import { SketchPicker } from 'react-color';  
import { Modal } from './Modal';  

const AdminForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: [] as File[],
    styledContent: [] as Array<{ type: string; value: string; style?: React.CSSProperties }>,
  });
  const [selectedStyle, setSelectedStyle] = useState<React.CSSProperties>({});
  const [contentPreview, setContentPreview] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);  
  const [selectedFont, setSelectedFont] = useState<string>('Arial'); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files?: FileList };
    if (name === 'image' && files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddStyledContent = () => {
    setFormData((prev) => ({
      ...prev,
      styledContent: [
        ...prev.styledContent,
        { type: 'text', value: contentPreview, style: { ...selectedStyle, color: selectedColor, fontFamily: selectedFont } },
      ],
    }));
    setContentPreview('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Blog submitted successfully!');
  };

  // Open/Close color picker modal
  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  // Update the selected color
  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      {/* Title Input */}
      <motion.input
        type="text"
        name="title"
        placeholder="Enter Blog Title"
        onChange={handleChange}
        className="border rounded p-2"
        required
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content Styling Toolbar */}
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={() => setSelectedStyle({ fontWeight: 'bold' })}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => setSelectedStyle({ fontSize: '1.5rem' })}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
        >
          <FaFont />
        </button>
        <button
          type="button"
          onClick={toggleColorPicker}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
        >
          <FaPalette />
        </button>
      </div>

      {/* Font Selector */}
      <div className="mt-4">
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      {/* Content Input */}
      <textarea
        value={contentPreview}
        onChange={(e) => setContentPreview(e.target.value)}
        placeholder="Write and style content here..."
        className="border rounded p-2"
        rows={3}
      />

      {/* Add Styled Content Button */}
      <motion.button
        type="button"
        onClick={handleAddStyledContent}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 w-32 text-white py-1 rounded shadow hover:bg-green-600 transition duration-200"
      >
        Add Content
      </motion.button>

      {/* Styled Content Preview */}
      <motion.div
        className="p-4 border rounded bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formData.styledContent.map((content, index) => (
          <p key={index} style={content.style}>
            {content.value}
          </p>
        ))}
      </motion.div>

      {/* Image Upload */}
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border rounded p-2"
        accept="image/*"
        multiple
      />
      <div className="flex flex-wrap gap-4">
        {formData.images.map((image, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              className="w-32 h-32 object-cover rounded shadow"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 w-32 text-white py-2 rounded shadow hover:bg-blue-600 transition duration-200"
      >
        Submit
      </motion.button>

      {isColorPickerOpen && (
        <Modal onClose={toggleColorPicker}>
          <div className="p-4">
            <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />
          </div>
        </Modal>
      )}
    </form>
  );
};

export default AdminForm;
