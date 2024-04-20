import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.list}>
      {images.map(image => (
        <li key={image.id} className={css.item}>
          <div onClick={() => onImageClick(image.urls.regular)}>
            <img
              className={css.img}
              src={image.urls.small}
              alt={image.description}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
