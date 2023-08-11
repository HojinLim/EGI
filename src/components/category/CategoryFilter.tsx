import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase/supabase';

interface Post {
  id: number;
  title: string;
  category: string;
  image_urls: string[];
}

export const categories = [
  { value: '컴퓨터', label: '컴퓨터' },
  { value: '노트북', label: '노트북' },
  { value: '콘솔', label: '콘솔' },
  { value: '핸드폰', label: '핸드폰' },
  { value: '주변기기', label: '주변기기' },
  { value: '모니터', label: '모니터' }
];

const CategoryFilter = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const postsWithCompleteURLs = data.map((post) => ({
          ...post,
          image_urls: post.image_urls ? post.image_urls.replace(/\[|\]|"/g, '').split(',') : []
        }));

        setPosts(postsWithCompleteURLs);
      }
    };

    fetchPosts();
  }, []);

  const handleCategoryClick = (category: string) => {
    const filteredPosts = posts.filter((post) => post.category === category);
    setFilteredPosts(filteredPosts);
  };

  const categoryButtons = categories.map((category) => (
    <button key={category.value} value={category.value} onClick={() => handleCategoryClick(category.value)}>
      {category.label}
    </button>
  ));

  return (
    <div>
      <div>{categoryButtons}</div>
      <div>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>

            <div>
              {post.image_urls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
