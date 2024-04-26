import css from './Contact.module.css'
export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.contactWrapper}>
        <div className={css.wrapper}>
      <p className={css.username}>{name}</p>
      <p className={css.userphone}>{number}</p>
      </div>
      <button className={css.btn} onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
