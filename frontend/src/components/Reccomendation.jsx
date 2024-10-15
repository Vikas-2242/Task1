import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { recommend } from "../react-query/api/peroperty";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recommendation.css";

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
  <div className="arrow arrow-next" onClick={onClick}>
    &gt;
  </div>
);

// Custom Prev Arrow Component
const PrevArrow = ({ onClick }) => (
  <div className="arrow arrow-prev" onClick={onClick}>
    &lt;
  </div>
);

const Recommendations = ({ recommended }) => {
  const [called, setCalled] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function recommending() {
      try {
        const localproper = localStorage.getItem("viewedProperties");
        const data = await recommend(localproper);
        setRecommendations(data);
        console.log(recommendations);
      } catch (e) {
        console.log(e);
      }
      setCalled(false);
    }
    called && recommending();
  }, []);

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Use custom next arrow
    prevArrow: <PrevArrow />, // Use custom prev arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">Recommended Properties</h2>
      {recommendations.length > 0 ? (
        <Slider {...settings} className="recommendation-slider">
          {recommendations.map((property) => (
            <div key={property.id} className="recommendation-card">
              <h3 className="recommendation-card-title">{property.title}</h3>
              <p className="recommendation-card-text">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="recommendation-card-text">
                <strong>Price:</strong> ${property.price} / night
              </p>
              <p className="recommendation-card-text">
                <strong>Category:</strong> {property.category}
              </p>
              <p className="recommendation-card-text">
                <strong>Amenities:</strong> {property.amenities.join(", ")}
              </p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500">
          No recommendations available at the moment.
        </p>
      )}
    </div>
  );
};

export default Recommendations;
