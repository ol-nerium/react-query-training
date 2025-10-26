import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import SearchForm from '@/components/SearchForm/SearchForm';
import ArticleList from '@/components/ArticleList/ArticleList';
import { fetchArticles } from '@/services/acticleService';
import css from './Articles.module.css';

export default function Articles() {
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['articles', topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  const handlePageClick = event => {
    // console.log(event.selected);
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />

      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(Math.max(currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
      {isSuccess && data.hits.length > 1 && (
        <>
          <p>
            Current page {currentPage} | Total pages {totalPages - 1}
          </p>
          <ReactPaginate
            pageCount={totalPages - 1}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            nextLabel=">>"
            previousLabel="<<"
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
          />
        </>
      )}
      {isLoading && <p> Loading...</p>}
      {isError && <p>Something gone wrong. Try again</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
    </>
  );
}
