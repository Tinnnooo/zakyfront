import { useState } from "react";
import axiosClient from "../axios";
import "../assets/css/add-banner.css";
import { useNavigate } from "react-router-dom";

export default function AddBanner() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("status", status);

    axiosClient
      .post("/banner/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Banner added successfully:", response.data);
        setTitle("");
        setImage(null);
        setDescription("");
        setStatus("active");
        navigate("/dashboard/banner");
      })
      .catch((error) => {
        console.error("There was an error adding the banner:", error);
      });
  };

  return (
    <div className="add-banner-container">
      <h2>Add New Banner</h2>
      <form className="add-banner-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter banner title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Banner
        </button>
      </form>
    </div>
  );
}
