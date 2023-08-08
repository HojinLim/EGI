import React, { useState, useMemo, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState(value);

  const modules = useMemo(() => {
    const Parchment = Quill.import('parchment');
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link'],
          ['image', 'video']
        ]
      },
      ImageResize: {
        parchment: Parchment
      }
    };
  }, []);

  // 에디터 내용이 바뀔 때마다 부모 컴포넌트로 업데이트 전달
  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return (
    <div>
      <ReactQuill
        style={{ width: '450px', height: '300px' }}
        placeholder="내용을 입력해주세요"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
