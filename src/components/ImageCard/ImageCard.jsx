import css from './ImageCard.module.css';

export default function ImageCard({ onImageClick, image }) {
  return (
    <div>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.description}
        onClick={() =>
          onImageClick(
            image.urls.regular,
            image.description,
            image.user.name,
            image.likes
          )
        }
      />
    </div>
  );
}
