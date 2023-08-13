import { ShareAltOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { styled } from 'styled-components';
import LinkIcon from '../../image/LinkIcon.png';
const Share = () => {
  const currentUrl = window.location.href;

  const items = [
    {
      key: '1',
      label: (
        <CopyToClipboard text={currentUrl} onCopy={() => alert('주소가 복사되었습니다.')}>
          <Img src={LinkIcon} alt="링크 아이콘" />
        </CopyToClipboard>
      )
    },
    {
      key: '2',
      label: (
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>
      )
    },
    {
      key: '3',
      label: (
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={36} round={true} />
        </FacebookShareButton>
      )
    }
  ];

  return (
    <Dropdown
      menu={{
        items
      }}
      placement="bottomLeft"
      arrow
    >
      <ShareAltOutlined />
    </Dropdown>
  );
};

export default Share;

const Img = styled.img`
  width: 38px;
`;
