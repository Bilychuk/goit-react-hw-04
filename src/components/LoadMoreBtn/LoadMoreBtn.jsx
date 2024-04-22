import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.loadMoreContainer}>
      <button className={css.loadMoreBtn} onClick={onClick}>
        Load more images
      </button>
    </div>
  );
}
