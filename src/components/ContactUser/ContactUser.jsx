import style from './ContactUser.module.css';
import PropTypes from 'prop-types';

export const ContactUser = ({ id, name, number, deleteContact }) => {
  return (
    <li>
      {name} : {number}
      <button
        className={style.btn}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactUser.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
