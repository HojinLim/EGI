import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { createClient } from '@supabase/supabase-js';
import { Post } from '../types/supabase';



// const [user] = useAtom(userAtom); // userAtom의 값을 가져옴

const UserPosts = () => {
  const [postMode, setPostMode] = useState<string>('');

  const handlePost = (mode: string) => {
    setPostMode(mode);
  };

  // superbase로 데이터 가져오기
  // const [datas, setDatas] = useState<Data[]>([]);
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const [posts, setPosts] = useState<Post[]>([]);
  // console.log(user?.email)
  console.log(posts);


  // const uid= userDB?.uid?.toString()
  const temp = 'hi';

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*').eq('uid', temp);
      console.log('data=>' + data);

      
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const postsWithCompleteURLs = data.map((post) => ({
          ...post,
          image_url: `https://bbakvkybkyfoiijevbec.supabase.co/storage/v1/object/public/1st/${post.image_url}`
        }));

        setPosts(postsWithCompleteURLs);
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

      <div style={{ width: '1000px', height: '600px', border: '2px solid black' }}></div>
    </div>
  );
};

export default UserPosts;
