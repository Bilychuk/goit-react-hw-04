import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.list}>
      {images.map(image => (
        <li key={image.id}>
          <div>
            <img src={image.urls.small} alt={image.description} />
          </div>
        </li>
      ))}
    </ul>
  );
}
