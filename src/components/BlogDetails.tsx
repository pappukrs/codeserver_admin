'use client';

import { useState, useEffect } from 'react';

interface BlogDetailsProps {
  blogId: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blogId }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockBlog = {
        id: blogId,
        title: `Blog Post ${blogId}`,
        content: `This is the detailed content of Blog Post ${blogId}.`,
        imageUrl: `/images/sample${blogId}.jpg`,
      };
      setBlog(mockBlog);
      setLoading(false);
    }, 1000); // Simulated delay
  }, [blogId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10">Blog not found.</div>;
  }

  return (
    <div className="p-6">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="rounded-lg w-full h-60 object-cover"
      />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{blog.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
