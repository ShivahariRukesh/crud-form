import "./Card.css";

import { deleteFormData } from "../features/form/formSlice";
import { useDispatch } from "react-redux";

const Card = (props) => {
  const { name, email, phoneNumber, dob, address, profilePicture } =
    props.credentials;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFormData({ email, phoneNumber }));
  };
  return (
    <div className="container">
      <ul className="info-list">
        <li>Name:{name}</li>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber}</li>
        <li>Profile Pic:{profilePicture}</li>
      </ul>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Card;
