import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from './editor/Editor';
import * as S from '../posts/Styled.Post';
// import * as S from './Styled.GetPosts';
import { handleImageChange } from '../../hooks/useHandleImage';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { categories, conditionCategories, directCategories, exchangeCategories } from '../category/Category';
import { CategoryRadio } from '../category/CategorySelect';
import CircularProgress from '@mui/material/CircularProgress';
import { PictureOutlined } from '@ant-design/icons';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [conditionCategory, setConditionCategory] = useState('');
  const [exchangeCategory, setExchangeCategory] = useState('');
  const [parcelCategorySelected, setParcelCategorySelected] = useState(false);
  const [iscompleted, setIscompeted] = useState(false);
  const [direct, setDirect] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('pid', id).single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(posts);
        setEditTitle(posts.title);
        setEditBody(posts.body);
        setLocation(posts.location);
        setPrice(posts.price);
        setCategory(posts.category);
        setConditionCategory(posts.condition);
        setExchangeCategory(posts.exchange);
        setParcelCategorySelected(posts.parcel);
        setIscompeted(posts.iscompleted === '판매 완료');
        setDirect(posts.direct);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditPost = async () => {
    if (
      !editTitle.trim() ||
      !editBody.trim() ||
      !location.trim() ||
      !price.toString().trim() ||
      !category ||
      !conditionCategory ||
      !exchangeCategory ||
      !direct
    ) {
      alert('모든 폼을 입력해주세요.');
      return;
    }

    let imageUrls: string[] = post ? post.image_urls : []; // 기존 이미지 유지

    if (selectedImages.length > 0) {
      const newImageUrls: string[] = [];

      for (const selectedImage of selectedImages) {
        const { data, error } = await supabase.storage
          .from('1st')
          .upload(`images/${selectedImage.name}`, selectedImage);

        if (error) {
          console.error('Error uploading image to Supabase storage:', error);
          alert('이미지 업로드 중 에러가 발생했습니다!');
          return;
        }

        newImageUrls.push(data.path);
      }

      imageUrls = newImageUrls;
    }

    if (post && editTitle && editBody) {
      const { error } = await supabase
        .from('posts')
        .update({
          title: editTitle,
          body: editBody,
          image_urls: imageUrls,
          price,
          location,
          category,
          condition: conditionCategory,
          exchange: exchangeCategory,
          direct: direct,
          parcel: parcelCategorySelected ? '택배비 포함' : '택배비 미포함',
          iscompleted: iscompleted ? '판매 완료' : '판매중'
        })
        .eq('pid', post.pid);

      if (error) {
        console.error('Error editing post:', error);
        alert('에러가 발생했습니다!');
      } else {
        alert('글 수정이 완료되었습니다.');
        navigate(-1);
      }
    }
  };

  const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const updatedSelectedImages = handleImageChange(selectedFiles);
      setSelectedImages(updatedSelectedImages);
    }
  };

  if (!post) {
    return (
      <div>
        Loading...
        <CircularProgress />
      </div>
    );
  }

  const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setPrice(inputValue);
  };

  const priceWithCommas = (price: string): string => {
    const numberOfPrice = Number(price);
    return numberOfPrice.toLocaleString();
  };

  return (
    <S.Container>
      <S.MainTitle>상품 수정</S.MainTitle>
      <S.TopLine></S.TopLine>
      <S.Wrapper>
        <S.TitleBox>
          <S.Title>제목</S.Title>
          <S.TitleInput type="text" placeholder="" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </S.TitleBox>
        <S.Line></S.Line>
        <S.LocalBox>
          <S.Local>거래 지역</S.Local>
          <S.LocalInput type="text" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)} />
        </S.LocalBox>
        <S.Line></S.Line>
        <S.CategoryBox>
          <S.Category>카테고리</S.Category>
          {categories.map((categoryOption) => (
            <CategoryRadio
              key={categoryOption.value}
              value={categoryOption.value}
              label={categoryOption.label}
              checked={categoryOption.value === category}
              onChange={() => setCategory(categoryOption.value)}
            />
          ))}
        </S.CategoryBox>
        <S.Line></S.Line>
        <S.ConditonBox>
          <S.Conditon>상태</S.Conditon>
          {conditionCategories.map((conditionCategoryOption) => (
            <CategoryRadio
              key={conditionCategoryOption.value}
              value={conditionCategoryOption.value}
              label={conditionCategoryOption.label}
              checked={conditionCategoryOption.value === conditionCategory}
              onChange={() => setConditionCategory(conditionCategoryOption.value)}
            />
          ))}
        </S.ConditonBox>
        <S.Line></S.Line>
        <S.ExChangeBox>
          <S.ExChange> 교환 여부</S.ExChange>
          {exchangeCategories.map((exchangeCategoryOption) => (
            <CategoryRadio
              key={exchangeCategoryOption.value}
              value={exchangeCategoryOption.value}
              label={exchangeCategoryOption.label}
              checked={exchangeCategoryOption.value === exchangeCategory}
              onChange={() => setExchangeCategory(exchangeCategoryOption.value)}
            />
          ))}
        </S.ExChangeBox>
        <S.Line></S.Line>
        <S.DirectBox>
          <S.Direct> 직거래 여부</S.Direct>
          {directCategories.map((directOption) => (
            <CategoryRadio
              key={directOption.value}
              value={directOption.value}
              label={directOption.label}
              checked={directOption.value === direct}
              onChange={() => setDirect(directOption.value)}
            />
          ))}
        </S.DirectBox>
        <S.Line></S.Line>
        <S.PriceBox>
          <S.Price>가격</S.Price>
          <S.PriceWrapper>
            <S.PriceInput
              type="text"
              placeholder="Price"
              value={priceWithCommas(price)}
              onChange={priceChangeHandler}
            />
            <label>원</label>
            <S.ParcelBox>
              <S.ParcelInput
                type="checkBox"
                value="택배비 포함"
                checked={parcelCategorySelected}
                onChange={() => setParcelCategorySelected(!parcelCategorySelected)}
              />{' '}
              <label>택배비 포함</label>
            </S.ParcelBox>
          </S.PriceWrapper>
        </S.PriceBox>
        <S.Line></S.Line>
        <S.IscompletedBox>
          <S.IscompletedCheck>판매 여부</S.IscompletedCheck>
          <S.IscompletedInput
            type="checkBox"
            value="판매 완료"
            checked={iscompleted}
            onChange={() => setIscompeted(!iscompleted)}
          />
          <S.Iscompleted>판매 완료</S.Iscompleted>
        </S.IscompletedBox>
        <S.Line></S.Line>
        <S.EditorBox>
          <Editor value={editBody} onChange={(content) => setEditBody(content)} />
          <S.FileLabel htmlFor="file-input">
            <PictureOutlined />
          </S.FileLabel>
          <S.FileInput id="file-input" type="file" accept="image/*" multiple onChange={handleImageChangeWrapper} />
          <S.WriterBtn onClick={handleEditPost}>수정하기</S.WriterBtn>
        </S.EditorBox>
      </S.Wrapper>
    </S.Container>
  );
};

export default EditPost;
