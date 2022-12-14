import React, { useCallback } from 'react';
import { Pagination as ReactBootstrapPagination } from 'react-bootstrap';

interface OwnProps {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
}

type Props = OwnProps;

const Pagination = React.memo(({
  pageNumber,
  setPageNumber,
  totalPages,
}: Props) => {
  const goToPreviousPage = useCallback(() => {
    setPageNumber(pageNumber - 1);
  }, [
    setPageNumber,
    pageNumber,
  ]);

  const goToNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [
    setPageNumber,
    pageNumber,
  ]);

  const hasPreviousPage = pageNumber > 0;
  const hasNextPage = (pageNumber + 1) < totalPages;

  if (!hasPreviousPage && !hasNextPage) return null;

  return (
    <ReactBootstrapPagination>
      {
        hasPreviousPage &&
        <ReactBootstrapPagination.Prev onClick={goToPreviousPage} />
      }
      <ReactBootstrapPagination.Item active={true}>{pageNumber + 1}</ReactBootstrapPagination.Item>
      {
        hasNextPage &&
        <ReactBootstrapPagination.Next onClick={goToNextPage} />
      }
    </ReactBootstrapPagination>
  );
});

export default Pagination;
