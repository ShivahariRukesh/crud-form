import "./Card.css";

const Card = (props) => {
  const { name, email, phoneNumber, dob, address, profilePicture } =
    props.credentials;

  return (
    <div className="container">
      <ul className="info-list">
        <li>Name:{name}</li>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber}</li>
        <li>Profile Pic:{profilePicture}</li>
      </ul>
    </div>
  );
};

export default Card;
