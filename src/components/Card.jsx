import "./Card.css";

const Card = (props) => {
  const { name, email, phoneNumber, dob, address, profilePicture } =
    props.credentials;
  const { city, province, district, country } = address;
  return (
    <div className="container">
      <ul className="info-list">
        <li>Name:{name}</li>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber}</li>
        <li>Date of Birth:{dob}</li>
        <li>City:{city}</li>
        <li>District:{district}</li>
        <li>Province no:{province}</li>
        <li>Country:{country}</li>
      </ul>
    </div>
  );
};

export default Card;
