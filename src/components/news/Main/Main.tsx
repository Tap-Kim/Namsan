import Input from '@Components/common/Input';
import Loading from '@Components/common/Loading';
import { isEmpty } from 'lodash';
import React, { Suspense, useState, lazy } from 'react';
import * as SearchBar from '../../members/SearchBar/SearchBar.style';
import Pagination from '../Pagination';
import { TTab } from './Main.interface';
import * as S from './Main.style';
import useMain from './Main.hook';
import { navigate } from 'gatsby';
import { injectIntl, useIntl, WrappedComponentProps } from 'gatsby-plugin-intl';
const Card = lazy(() => import('@Components/news/Card'));

interface Props extends WrappedComponentProps {}
const NewsMain = (props: Props) => {
  const intl = useIntl();
  const [searchValue, setSearchValue] = useState('');
  const { urlPage, newsType, tab, newsList, pageNationState, onCallNewsList } =
    useMain();

  const handleTab = (e: React.MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    setSearchValue('');
    navigate(
      `/${props.intl.locale}/news${type === 'all' ? '' : `?newsType=${type}`}`,
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    onCallNewsList(tab, searchValue);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isPagination = !isEmpty(pageNationState);

  return (
    <>
      <S.TabSearchBox>
        <S.TabBox>
          <S.Tab isActive={tab === 'all'}>
            <a href="#" onClick={e => handleTab(e, 'all')}>
              전체
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'media'}>
            <a href="#" onClick={e => handleTab(e, 'media')}>
              언론보도
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'recent'}>
            <a href="#" onClick={e => handleTab(e, 'recent')}>
              최근 업무사례
            </a>
          </S.Tab>
        </S.TabBox>

        {/* TODO: searchBar common 영역으로 옮겨갈때 반영(feat. @ttumzzi) */}
        <SearchBar.ItemWrapper width="384px">
          <Input
            placeholder={intl.formatMessage({
              id: 'news.search_placeholder',
            })}
            value={searchValue}
            handleSubmit={handleSubmit}
            handleChange={handleNameChange}
          />
        </SearchBar.ItemWrapper>
      </S.TabSearchBox>
      <Suspense
        fallback={
          <div className="loading_cards">
            <Loading height="500px" />
          </div>
        }
      >
        <Card
          type="news"
          newsList={newsList}
          {...{ urlPage, newsType, onCallNewsList, searchValue }}
        />
      </Suspense>
      {isPagination && (
        <Pagination {...{ newsType, urlPage, pageNationState }} />
      )}
    </>
  );
};

export default injectIntl(NewsMain);
