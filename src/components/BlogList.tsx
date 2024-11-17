'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setBlogs([
        {
          id: '1',
          title: 'Blog Post 1',
          summary: 'This is a summary of Blog Post 1.',
          imageUrl: '/images/sample1.jpg',
        },
        {
          id: '2',
          title: 'Blog Post 2',
          summary: 'This is a summary of Blog Post 2.',
          imageUrl: '/images/sample2.jpg',
        },
        {
          id: '3',
          title: 'Blog Post 3',
          summary: 'This is a summary of Blog Post 3.',
          imageUrl: '/images/sample3.jpg',
        },
      ]);
      setLoading(false);
    }, 1000); // Simulated delay
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 cursor-pointer"
          onClick={() => router.push(`/blog/details/${blog.id}`)}
        >
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="rounded-lg w-full h-40 object-cover"
          />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-4">{blog.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{blog.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
