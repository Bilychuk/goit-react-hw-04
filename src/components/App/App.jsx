import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../images-api.js';
import { ThreeDots } from 'react-loader-spinner';
import ImageModal from '../ImageModal/ImageModal.jsx';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedAriaLabel, setSelectedAriaLabel] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [likes, setLikes] = useState('');

  const handleSubmit = newImage => {
    setQuery(newImage);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (imageUrl, ariaLabel, author, likes) => {
    setSelectedImageUrl(imageUrl);
    setSelectedAriaLabel(ariaLabel);
    setSelectedAuthor(author);
    setLikes(likes);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function getImages() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });

        if (data.total_pages === 0) {
          toast.error('Sorry, we did not find the images.', {
            duration: 6000,
            position: 'bottom-right',
          });
        } else if (data.total_pages === 1) {
          toast.success(`We found ${data.results.length} images!`, {
            duration: 4000,
            position: 'bottom-right',
          });
        }
        setShowBtn(data.total_pages && data.total_pages !== page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <b>Oops!There was an error! Please reload!</b>}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && (
        <div className={css.loaderContainer}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {showBtn && images.length > 0 && !isLoading && (
        <div className={css.loadMoreContainer}>
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more images
          </button>
        </div>
      )}
      <ImageModal
        isOpen={isImageModalOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImageUrl}
        ariaLabel={selectedAriaLabel}
        author={selectedAuthor}
        likes={likes}
      />
      <Toaster
        toastOptions={{
          style: {
            color: 'white',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
    </div>
  );
}
