import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import "./slick.css";
import "./slick-theme.css";


const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slider-arrow slider-arrow-prev" onClick={onClick}>
      &lt;
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slider-arrow slider-arrow-next" onClick={onClick}>
      &gt;
    </div>
  );
};




const drinkImages = {
  0: "drink0.png",
  1: "drink1.png",
  2: "drink2.png",
  3: "drink3.png",
  4: "drink4.png",
  5: "drink5.png",
  6: "drink6.png",
  7: "drink7.png",
  8: "drink8.png",
  9: "drink9.png",
  10: "drink10.png",
  11: "drink11.png",
  12: "drink12.png",
  13: "drink13.png",
  14: "drink14.png",
  15: "drink15.png",
  16: "drink16.png",
  17: "drink17.png",
  18: "drink18.png",
  19: "drink19.png",
  20: "drink20.png",
  21: "drink21.png",
  22: "drink22.png",
  23: "drink23.png",
  24: "drink24.png",
  25: "drink25.png",
  26: "drink26.png",
  27: "drink27.png",
  28: "drink28.png",
  29: "drink29.png",
  30: "drink30.png",
  31: "drink31.png",
  32: "drink32.png",
  33: "drink33.png",
  34: "drink34.png",
  35: "drink35.png",
  36: "drink36.png",
  37: "drink37.png",
  38: "drink38.png",
  39: "drink39.png",
  40: "drink40.png",
  41: "drink41.png",
  42: "drink42.png",
  43: "drink43.png",
  44: "drink44.png",
  45: "drink45.png",
  46: "drink46.png",
  47: "drink47.png",
  48: "drink48.png",
  49: "drink49.png",
  50: "drink50.png",
  51: "drink51.png",
  52: "drink52.png",
  53: "drink53.png",
  54: "drink54.png",
  55: "drink55.png",
  56: "drink56.png",
  57: "drink57.png",
  58: "drink58.png",
  59: "drink59.png",
  60: "drink60.png",
  61: "drink61.png",
  62: "drink62.png",
  63: "drink63.png",
  64: "drink64.png",
  65: "drink65.png",
  66: "drink66.png",
  67: "drink67.png",
  68: "drink68.png",
  69: "drink69.png",
  70: "drink70.png",
  71: "drink71.png",
  72: "drink72.png",
  73: "drink73.png",
  74: "drink74.png",
  75: "drink75.png",
  76: "drink76.png",
  77: "drink77.png",
  78: "drink78.png",
  79: "drink79.png",
  80: "drink80.png",
  81: "drink81.png",
  82: "drink82.png",
  83: "drink83.png",
  84: "drink84.png",
  85: "drink85.png",
  86: "drink86.png",
  87: "drink87.png",
  88: "drink88.png",
  89: "drink89.png",
  90: "drink90.png",
  91: "drink91.png",
  92: "drink92.png",
  93: "drink93.png",
  94: "drink94.png",
  95: "drink95.png",
  96: "drink96.png",
  97: "drink97.png",
  98: "drink98.png",
  99: "drink99.png",
  100: "drink100.png",
  101: "drink101.png",
  102: "drink102.png",
  103: "drink103.png",
  104: "drink104.png",
  105: "drink105.png",
  106: "drink106.png",
};

const snackImages = {
  0: "snack0.jpg",
  1: "snack1.jpg",
  2: "snack2.jpg",
  3: "snack3.jpg",
  4: "snack4.jpg",
  5: "snack5.jpg",
};

export const MenuSlider = ({ section, sectionName, handleClick }) => {
  const [selectedSize, setSelectedSize] = useState("chips");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); 
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2
        className="sectionName"
        style={{
          textAlign: "left",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "red",
          color: "white",
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "20px",
        }}
      >
        {sectionName}
      </h2>
      <Slider {...settings}>
        {section.map((drink) => (
          <div key={drink.id}>
            <div className="drink-container">
              {sectionName !== "Snacks" ? (
                <div>
                  <div>
                  <img
                    style={{ display: "inline-block", marginLeft: "50px" }}
                    src={require(`../../images/${drinkImages[drink.id]}`)}
                    alt={drink.name}
                  />
                  </div>
                  <select style={{position:"absolute", marginTop: "55px", marginRight: "50px", marginLeft: "-50px"}} id="size" value={selectedSize} onChange={handleSizeChange}>
                    <option value="select">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              ) : null}
              {sectionName === "Snacks" && (
                <img
                  className="snack-img"
                  style={{ display: "inline-block", marginLeft: "50px", backgroundColor: "red" }}
                  src={require(`../../images/${snackImages[drink.id]}`)}
                  alt={drink.name}
                />
              )}
            
            <div>
              <h3
                style={{
                  paddingBottom: "50px",
                  textAlign: "center",
                  marginLeft: "35px",
                  marginTop: "5px",
                }}
              >
                {drink.name}
              </h3>

            </div>

            <div>
              <button
                className="orderBtn"
                style={{
                  marginBottom: "15px",
                  marginLeft: "25px",
                  marginTop: "45px",
                  backgroundColor: "red",
                  border: "1px solid black",
                  color: "white",
                }}
                
                onClick={() => handleClick(drink.name, selectedSize)}
              >
                Add to order
              </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
