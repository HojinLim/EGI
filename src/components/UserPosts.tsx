import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Pagination from './Pagination'; // Pagination 컴포넌트를 import
import { createClient } from '@supabase/supabase-js';

interface Data {
  pid: number;
  created_at: string;
  title: string;
  price: number;
  image_url: string;
}

const UserPosts = () => {
  const [postMode, setPostMode] = useState<string>('');

  const handlePost = (mode: string) => {
    setPostMode(mode);
  };

  // superbase로 데이터 가져오기
  const [datas, setDatas] = useState<Data[]>([]);
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setDatas(data);
        console.log(data);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>User Posts</h2>

      <button onClick={() => handlePost('내가 쓴 글')}>내가 쓴 글</button>
      <button onClick={() => handlePost('찜 목록')}>찜 목록</button>
      <h2>{postMode}</h2>

      <div style={{ width: '1000px', height: '600px', border: '2px solid black' }}>
        <Pagination postMode={postMode} posts={datas} /> {/* Pagination 컴포넌트를 사용 */}
      </div>
    </div>
  );
};

export default UserPosts;
