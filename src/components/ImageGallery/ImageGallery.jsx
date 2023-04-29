import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItemBox } from 'components';

export function ImageGallery({ imageList }) {
  return (
    <ImageGalleryList>
      {imageList.map(({ id, webformatURL, largeImageURL, isAnchor }) => (
        <ImageGalleryItemBox
          key={id}
          imageListUrl={webformatURL}
          imageModal={largeImageURL}
          isAnchor={isAnchor}
        />
      ))}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      isAnchor: PropTypes.bool.isRequired,
    })
  ),
};
