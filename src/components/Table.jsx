import { useEffect, useState } from "react";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormData,
  deleteFormData,
  editFormData,
} from "../features/form/formSlice";
const Table = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [editButton, setEditButton] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.userData);

  const currentItems = formData.slice(currentPage * 5, (currentPage + 1) * 5);
  useEffect(() => {
    dispatch(getFormData());
  }, []);

  const handleEdit = () => {
    dispatch(editFormData(user));
    setEditButton(true);
  };
  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            {/* <th>Address</th> */}
            <th>Profile Picture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              {/* <td>{user.address}</td> */}
              <td>
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                )}
              </td>
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button
                  onClick={() => {
                    dispatch(deleteFormData(user));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {currentPage === 0 || (
          <button onClick={() => setCurrentPage((prev) => prev - 1)}>
            Prev
          </button>
        )}
        {currentItems.length > 4 && formData.length / 5 !== currentPage + 1 && (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
