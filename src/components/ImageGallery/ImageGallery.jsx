import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.list}>
      {images.map(image => (
        <li key={image.id} className={css.item}>
          <div>
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
