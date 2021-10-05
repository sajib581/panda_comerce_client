import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router";
import Nav from "../Shared/Nav/Nav";
import DetailsModal from "./DetailsModal/DetailsModal";
import ShortDescriptionModal from "./ShortDescriptionModal/ShortDescriptionModal";

Modal.setAppElement("#root");

const Admin = () => {
  const [shortDescription, setShortDescription] = useState([]);
  const [details, setDetails] = useState([]);
  const [shortDesModalIsOpen, setShortDesModalIsOpen] = React.useState(false);
  const [detailsModalIsOpen, setdetailsModalIsOpen] = React.useState(false);
  const [ file, setFile] = useState(0) ;
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fileChangeHandeller = (e) => {
    const newFile = e.target.files[0]
    setFile(newFile)
}

  function openShortDesModal() {
    setShortDesModalIsOpen(true);
  }

  function closeShortDesModal() {
    setShortDesModalIsOpen(false);
  }

  function openDetailsModal() {
    setdetailsModalIsOpen(true);
  }

  function closeDetailsModal() {
    setdetailsModalIsOpen(false);
  }

  const submitHandeler = (data, e) => {
    data = {
      ...data,
      details,
      short_description : shortDescription
    } 

    const goForNext = data.details.length >0 && data.short_description.length > 0
    if(goForNext){
      if(["image/jpeg", "image/png", "image/jpg"].includes(file.type)){
        console.log("Admin : ", data);
        const formData = new FormData();
        
        formData.append('file', file)
        formData.append('productInfo', JSON.stringify(data))

        const jwtToken = localStorage.getItem('jwtToken');
        fetch(`https://panda-commerce.herokuapp.com/admin/addProduct/${jwtToken}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (!data.errors) {
                    alert("Product added Sucessfully")
                    history.push('/')
                }
            })
            .catch(error => {
              console.log("Error Occured in adding product");
                console.error(error)
            })
      }else{
        alert("File type jpeg, png, jpg is must required")
      }
    }else{
      alert("Short Description and Details button is required")
    }
 
  };

  const handelSubmit = handleSubmit(submitHandeler);
  return (
    <div>
      <Nav />
      <h1 className="text-center">Admin Page</h1>
      <div>
        <div className="container-fluid">
          <div className="mx-md-5 p-4 pr-3">
            <form style={{ width: "100%" }}>
              <div className="row">
                <div className="form-group col-6">
                  <label>Product Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                  />
                  <span className="text-danger">
                    {errors.name && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Quantity</label>
                  <input
                    {...register("quantity", { required: true })}
                    type="number"
                    name="quantity"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Product Quantity"
                  />
                  <span className="text-danger">
                    {errors.quantity && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Short Description</label> <br />
                  <input
                    {...register("short_description", { required: true })}
                    type="button"
                    onClick={openShortDesModal}
                    value="Short Description"
                    name="short_description"
                    className="form-control btn btn-outline-info"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter short_description"
                    style={{ border: "1px solid silver" }}
                  />
                  <span className="text-danger">
                    {errors.short_description && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Details</label> <br />
                  <input
                    {...register("details", { required: true })}
                    type="button"
                    value="Product Details"
                    onClick={openDetailsModal}
                    name="short_description"
                    className="form-control btn btn-outline-info "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter short_description"
                    style={{ border: "1px solid silver" }}
                  />
                  <span className="text-danger">
                    {errors.details && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Price</label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    name="price"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Price"
                  />
                  <span className="text-danger">
                    {errors.price && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Discount (%)</label>
                  <input
                    {...register("discount", { required: true })}
                    type="number"
                    name="discount"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="descount Count in percent"
                  />
                  <span className="text-danger">
                    {errors.discount && "This Field is required"}
                  </span>
                </div>

                <div className="form-group col-6">
                  <label>Catagories</label>
                  <select className=" custom-select" {...register("categories")}>
                    <option disabled>Choose...</option>
                    <option selected value="Motorcycle">Motorcycle</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                  <span className="text-danger">
                    {errors.categories && "This Field is required"}
                  </span>
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="formFile" className="form-label">
                    Product Image
                  </label>
                  <input onChange={fileChangeHandeller} accept="image/*" className="form-control" type="file" id="formFile" />
                </div>
                <div className="form-group col-6">
                  <label>Seller Name</label>
                  <input
                    {...register("seller")}
                    type="text"
                    name="seller"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Seller name default SELF"
                  />
                  <span className="text-danger">
                    {errors.discount && "This Field is required"}
                  </span>
                </div>
              </div>
              <button onClick={handelSubmit} className="btn btn-info px-5 py-2">
                Add Product Boss
              </button>
            </form>
          </div>
        </div>
      </div>

      <ShortDescriptionModal
        modalIsOpen={shortDesModalIsOpen}
        setIsOpen={setShortDesModalIsOpen}
        closeModal={closeShortDesModal}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
      ></ShortDescriptionModal>

      <DetailsModal
        modalIsOpen={detailsModalIsOpen}
        setIsOpen={setdetailsModalIsOpen}
        closeModal={closeDetailsModal}
        details={details}
        setDetails={setDetails}
      ></DetailsModal>
    </div>
  );
};

export default Admin;
