import { useEffect } from "react";
import axiosClient from "../axios";
import { useStageContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import "../assets/css/banner-admin.css";

export default function BannerAdmin() {
  const { banners, setBanners } = useStageContext();

  useEffect(() => {
    axiosClient
      .get("/banner")
      .then(({ data }) => {
        setBanners(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setBanners]);

  const onDelete = (id) => {
    axiosClient
      .delete(`/banner/${id}`)
      .then(({ data }) => {
        const delBanner = banners.filter((banner) => banner.id !== id);
        setBanners(delBanner);
      })
      .catch((err) => {
        const errMessage = err.response?.data?.message;
        console.log(errMessage);
      });
  };

  return (
    <div className="banner-admin-container">
      <h1 className="management">Banner Management</h1>
      <Link to="/dashboard/add-banner" className="add">
        Add Banner
      </Link>
      <div className="banner-list">
        {banners.length === 0 ? (
          <p>No banners available.</p>
        ) : (
          <ul>
            {banners.map((banner) => (
              <li key={banner.id} className="banner-item">
                <h3>{banner.title}</h3>
                <img
                  src={`data:image/jpeg;base64,${banner.image}`}
                  alt={banner.title}
                  className="banner-image"
                />
                <p className="banner-description">{banner.description}</p>
                <p>Status: {banner.status}</p>
                <div className="banner-actions">
                  <Link
                    to={`/dashboard/edit-banner/${banner.id}`}
                    className="edit-button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(banner.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
