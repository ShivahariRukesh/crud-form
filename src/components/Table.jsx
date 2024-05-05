import { useEffect, useState } from "react";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormData,
  deleteFormData,
  editFillForm,
} from "../features/form/formSlice";
const Table = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.userData);

  const currentItems = formData.slice(currentPage * 5, (currentPage + 1) * 5);
  useEffect(() => {
    dispatch(getFormData());
  }, [props.editButton]);

  function handleEdit(user) {
    dispatch(editFillForm(user));
    props.toggleEditButton(true);
  }

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td>
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>

              <td>
                <button
                  onClick={() => {
                    handleEdit(user);
                  }}
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    cursor: `${props.editButton ? "not-allowed" : ""}`,
                  }}
                  disabled={props.editButton}
                  onClick={() => {
                    dispatch(deleteFormData(user));
                  }}
                >
                  {props.editButton ? "Disabled" : "Delete"}
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
