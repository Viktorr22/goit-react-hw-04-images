import { Component } from 'react';
import {
  AppBox,
  Searchbar,
  ImageGallery,
  Button,
  Loader,
  fetchPicture,
} from 'components';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    error: '',
    loading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ total: 0, loading: true, error: '' });
      fetchPicture(query, page)
        .then(({ total, hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL }, idx) => ({
              id,
              webformatURL,
              largeImageURL,
              isAnchor: !idx,
            })
          );
          console.log(images);
          return { total, images };
        })
        .then(({ total, images }) => {
          if (!total) return;
          this.setState(prevState => ({
            total,
            images: [...prevState.images, ...images],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleFormSubmit = query => {
    if (query === this.state.query) return;
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, images, total, query, error } = this.state;
    const { handleFormSubmit, onLoadMore } = this;
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
}
