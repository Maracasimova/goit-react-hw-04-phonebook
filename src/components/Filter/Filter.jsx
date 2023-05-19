import style from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ handleChangeFilter, filter }) => {
  return (
    <label>
      <p className={style.find}>Find contacts by name</p>
      <input
        className={style.input}
        name="filter"
        type="text"
        value={filter}
        onChange={handleChangeFilter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
};
