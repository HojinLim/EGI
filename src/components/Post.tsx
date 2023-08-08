import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Comments from './comments/Comments';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Post {
  id: number;
  title: string;
  content: string;
}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newbody, setNewBody] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    }

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (newTitle && newbody) {
      const { data, error } = await supabase.from('posts').insert([{ title: newTitle, body: newbody }]);

      if (error) {
        console.error('Error adding post:', error);
      } else {
        if (data) {
          setPosts([...posts, ...data]);
          setNewTitle('');
          setNewBody('');
        }
      }
    }
  };

  if (!posts) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <input type="text" placeholder="body" value={newbody} onChange={(e) => setNewBody(e.target.value)} />
        <button onClick={handleAddPost}>addPost</button>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <Comments></Comments>
    </div>
  );
};

export default Post;
