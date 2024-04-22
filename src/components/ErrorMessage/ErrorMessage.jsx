import css from './ErrorMessage.module.css' 
export default function ErrorMessage() {
  return <b className={css.error}>Oops!There was an error! Please reload!</b>;
}
