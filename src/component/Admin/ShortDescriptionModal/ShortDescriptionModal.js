import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const ShortDescriptionModal = ({
  modalIsOpen,
  setIsOpen,
  closeModal,
  shortDescription,
  setShortDescription,
}) => {
  const customStyles = {
    overlay: {
      background: "rgba(130,125,125,0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      height: "70vh",
      width: "700px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { register, handleSubmit, watch, errors } = useForm();

  const submitHandeler = (data, e) => {
    console.log("data ", data);
    e.target.reset();
    const newDescription = [...shortDescription, data];
    setShortDescription(newDescription);
  };
  let buttonPosition = shortDescription.length > 4 ? "static" : "fixed";

  const deleteHandeler = (key, value) => {
    const newDescription = shortDescription.filter((data) => {
      return !(key === data.key && value === data.value);
    });
    setShortDescription(newDescription);
  };
  return (
    <div className="px-5 mx-5">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form style={{width: '100%'}}
          onSubmit={handleSubmit(submitHandeler)}
          className="form-group d-flex mt-3  mx-3"
        >
          <input
            {...register("key")}
            name="key"
            placeholder="Description"
            id="description"
            className="form-control col-6 rounded-0"
          />

          <input
            {...register("value")}
            placeholder="Value"
            id="value"
            name="value"
            className="form-control col-5 rounded-0"
          />
          <button
            style={{ height: "38px" }}
            type="submit"
            className="btn-brand col-1 text-white"
          >
            <FontAwesomeIcon style={{ height: "100%" }} icon={faPlus} />
          </button>
        </form>

        <div>
          {
            <table className="table table-borderless">
              <tbody>
                {shortDescription.map((feature, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{feature.key}</td>
                    <td>{feature.value}</td>
                    <td>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faTrash}
                        onClick={() =>
                          deleteHandeler(feature.key, feature.value)
                        }
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{ position: buttonPosition, left: "20px", bottom: "20px" }}
          className="btn btn-brand"
        >
          Add Short Description and Close
        </button>
      </Modal>
    </div>
  );
};

export default ShortDescriptionModal;
