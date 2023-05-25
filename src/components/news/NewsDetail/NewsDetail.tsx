import { getData, getFileFromStorage } from '@Api/index.api';
import { getNewsMember } from '@Api/news.api';
import BaseButton from '@Components/common/BaseButton';
import Loading from '@Components/common/Loading';
import LineArrowIcon from '@Components/icons/LineArrowIcon';
import { navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { injectIntl } from 'gatsby-plugin-intl';
import { isEmpty } from 'lodash';
import React, { Suspense, useEffect, useState } from 'react';
import { convertDateStr } from './NewsDetail.helper';
import { NewsProfile, Props } from './NewsDetail.interface';
import * as S from './NewsDetail.style';

const NewsDetail = (props: Props) => {
  const {
    id: DocumentId,
    agency,
    newsType,
    originalLink,
    title,
    content,
    date,
    imagePath,
    prevNews,
    nextNews,
  } = props;
  console.log(imagePath);

  const dateYearMonthDate = convertDateStr(date);

  const [image, setImage] = useState<string>();
  const [profile, setProfile] = useState<NewsProfile>();

  useEffect(() => {
    imagePath && getFileFromStorage(imagePath).then(setImage);
    DocumentId && getNewsMember(DocumentId).then(setProfile);
  }, []);

  const onClickOiriginal = () => {
    window.open(originalLink ?? '', '_blank');
  };
  const handleClickList = () => {
    navigate(`/${props.intl.locale}/news`);
  };
  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const _id = event.currentTarget.dataset.id as 'prev' | 'next';
    navigate(`/${props.intl.locale}/news/${_id}`);
  };

  const isMediaNews = newsType === 'media' && image;
  const topTxt = isMediaNews ? agency : '최근 업무사례';

  const isProfile = !isEmpty(profile);
  const isPrevContent = !isEmpty(prevNews);
  const isNextContent = !isEmpty(nextNews);

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <S.TopText newsType={newsType}>{topTxt}</S.TopText>
        <S.TitleArea>
          <LineArrowIcon
            direction="LEFT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
          <h1>{title}</h1>
          <LineArrowIcon
            direction="RIGHT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
        </S.TitleArea>
        <S.HeaderDivder />
        <S.DateARea>{dateYearMonthDate}</S.DateARea>
      </S.HeaderContainer>
      <S.ContentConatiner isProfile={!isEmpty(profile)}>
        {isMediaNews && (
          <Suspense fallback={<Loading height="500px" />}>
            <article className="top">
              <img src={image} alt={title} loading={'lazy'} />
            </article>
          </Suspense>
        )}
        <S.Content>{content}</S.Content>
        <article className="bottom">
          {isProfile ? (
            <S.ProfileArea>
              <img
                alt={profile.name}
                src={profile.profileImage}
                loading={'lazy'}
              />
              <S.TextSection>
                <S.Name>{profile.name}</S.Name>
                <S.Position>{profile.position}</S.Position>
              </S.TextSection>
            </S.ProfileArea>
          ) : (
            <BaseButton className={'support'} onClick={onClickOiriginal}>
              기사 원문보기
            </BaseButton>
          )}
        </article>
      </S.ContentConatiner>
      <S.BottomConatiner
        isPrevContent={isPrevContent}
        isNextContent={isNextContent}
      >
        <div className="action__area">
          {isPrevContent && (
            <div className="prev">
              <button data-id={prevNews.id} onClick={handleMove}>
                <LineArrowIcon direction={'LEFT'} weight="NORMAL" />
                <p>이전글</p>
              </button>
              <p className="btn_title">{prevNews?.title}</p>
            </div>
          )}
          <S.ListIconWrapper>
            <BaseButton className="hamburger-news" onClick={handleClickList} />
          </S.ListIconWrapper>

          {isNextContent && (
            <div className="next">
              <p className="btn_title">{nextNews.title}</p>
              <button data-id={nextNews.id} onClick={handleMove}>
                <p>다음글</p>
                <LineArrowIcon direction={'RIGHT'} weight="NORMAL" />
              </button>
            </div>
          )}
        </div>
      </S.BottomConatiner>
    </S.Wrapper>
  );
};

export default injectIntl(NewsDetail);
