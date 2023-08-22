import { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACTS,
  UPDATE_AVATAR,
} from "../graphql/gql";
import { useMutation } from "@apollo/client";
import defaultAvatar from "../bussines-man.png";
import axios from "axios";

export default function UserItem({ no, student }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState(student.phone);
  const [avatarSource, setAvatar] = useState(
    student.avatar
      ? `http://localhost:3001/images/${student.avatar}`
      : defaultAvatar
  );
  const [updateContact, { datas }] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const [updateAvatar, { data, loading, error }] = useMutation(UPDATE_AVATAR, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const [deleteContact, { dataa }] = useMutation(DELETE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error : {error.message}</h1>;

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to remove this contact?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteContact({ variables: { id: student._id } }),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleAvatarChange = async (event) => {
    const picture = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", picture);

    try {
      const response = await axios.post(
        `http://localhost:3001/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await updateAvatar({
        variables: { id: student._id, avatar: response.data },
      });
      window.location.reload();
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  return (
    <div className="container">
      <div
        className=""
        onClick={() =>
          document.getElementById(`selectAvatar${student._id}`).click()
        }
      >
        <img
          key={avatarSource}
          src={avatarSource}
          alt="Avatar"
          className="avatar"
        />
        <input
          id={"selectAvatar" + student._id}
          hidden
          type="file"
          name="avatar"
          onChange={handleAvatarChange}
        />
      </div>
      <div className="list">
        <br />
        <p>
          {isEdit ? (
            <input
              value={name}
              style={{ width: "60%" }}
              onChange={(event) => setName(event.target.value)}
            />
          ) : (
            name
          )}
        </p>
        <br />
        <p>
          {isEdit ? (
            <input
              value={phone}
              style={{ width: "60%" }}
              onChange={(event) => setPhone(event.target.value)}
            />
          ) : (
            phone
          )}
        </p>
        <br />
        {isEdit ? (
          <div>
            <i
              className="fa-solid fa-floppy-disk"
              onClick={() => {
                updateContact({ variables: { id: student._id, name, phone } });
                setIsEdit(false);
              }}
            ></i>
          </div>
        ) : (
          <div>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => setIsEdit(true)}
            ></i>
            <i className="fa-solid fa-trash-can" onClick={submit}></i>
          </div>
        )}
      </div>
    </div>
  );
}
