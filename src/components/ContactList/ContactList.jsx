import { ContactUser } from 'components/ContactUser/ContactUser';
import PropTypes from 'prop-types';

export const ContactList = ({ contactSeach, deleteContact }) => {
  if (contactSeach.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <ul>
      {contactSeach.map(({ name, number, id }) => {
        return (
          <ContactUser
            id={id}
            key={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contactSeach: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
