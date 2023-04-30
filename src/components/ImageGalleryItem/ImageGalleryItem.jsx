import PropTypes from 'prop-types';
import { useState, createRef, useEffect } from 'react';
import { ImageGalleryItem, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export function ImageGalleryItemBox({ imageListUrl, imageModal, isAnchor }) {
  const [showModal, setShowModal] = useState(false);

  const liRef = createRef();

  useEffect(() => {
    if (!liRef.current) return;
    const elementPosition = liRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 100;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });

  const togleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageGalleryItem ref={isAnchor ? liRef : null} onClick={togleModal}>
        <ImageGalleryImage src={imageListUrl} alt="" />
      </ImageGalleryItem>
      {showModal && <Modal onClose={togleModal} largeImage={imageModal} />}
    </>
  );
}

ImageGalleryItemBox.propTypes = {
  imageListUrl: PropTypes.string.isRequired,
  isAnchor: PropTypes.bool.isRequired,
  imageModal: PropTypes.string.isRequired,
};
