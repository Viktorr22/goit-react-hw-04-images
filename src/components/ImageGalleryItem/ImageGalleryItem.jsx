import PropTypes from 'prop-types';
import { Component, createRef } from 'react';
import { ImageGalleryItem, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export class ImageGalleryItemBox extends Component {
  state = {
    showModal: false,
  };

  liRef = createRef();

  componentDidMount() {
    if (!this.liRef.current) return;
    const elementPosition = this.liRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 100;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imageListUrl, isAnchor, imageModal } = this.props;
    const { togleModal, liRef } = this;
    const { showModal } = this.state;
    return (
      <>
        <ImageGalleryItem ref={isAnchor ? liRef : null} onClick={togleModal}>
          <ImageGalleryImage src={imageListUrl} alt="" />
        </ImageGalleryItem>
        {showModal && <Modal onClose={togleModal} largeImage={imageModal} />}
      </>
    );
  }
}

ImageGalleryItemBox.propTypes = {
  imageListUrl: PropTypes.string.isRequired,
  isAnchor: PropTypes.bool.isRequired,
  imageModal: PropTypes.string.isRequired,
};
