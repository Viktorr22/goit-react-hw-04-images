import { useState, useEffect } from 'react';
import {
  AppBox,
  Searchbar,
  ImageGallery,
  Button,
  Loader,
  fetchPicture,
} from 'components';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setTotal(0);
    setLoading(true);
    setError('');
    fetchPicture(query, page)
      .then(({ total, hits }) => {
        const images = hits.map(({ id, webformatURL, largeImageURL }, idx) => ({
          id,
          webformatURL,
          largeImageURL,
          isAnchor: !idx,
        }));
        return { total, images };
      })
      .then(({ total, images }) => {
        if (!total) return;
        setTotal(total);
        setImages(prevImages => [...prevImages, ...images]);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const handleFormSubmit = querySubmit => {
    if (querySubmit === query) return;
    setQuery(querySubmit);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const buttonVisible = !loading && images.length < total;

  return (
    <AppBox>
      <Searchbar onSubmitForm={handleFormSubmit} />
      {loading && <Loader />}
      {query && total === 0 && !loading ? (
        <h1>По данному запросу ничего не найдено!</h1>
      ) : (
        <ImageGallery imageList={images} />
      )}
      {buttonVisible && <Button onClick={onLoadMore} />}
      {error && <p>{error}</p>}
    </AppBox>
  );
}
