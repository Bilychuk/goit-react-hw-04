import Modal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
  content: {
    backgroundColor: 'rgba(60, 60, 60, 0.7)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      style={customStyles}
      overlayClassName={css.overlay}
    >
      <img src={imageUrl} alt="Large Image" className={css.image} />
    </Modal>
  );
};

export default ImageModal;
