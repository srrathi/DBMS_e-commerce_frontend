import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../../../assets/images/1.jpg";
import img2 from "../../../assets/images/2.jpg";
import img3 from "../../../assets/images/3.jpg";
import img4 from "../../../assets/images/4.jpg";
import img5 from "../../../assets/images/5.jpg";

const ImageCarousel = () => {
  return (
    <Carousel
      indicators
      nextLabel=""
      prevLabel=""
      style={{ backgroundColor: "rgba(2, 174, 180,0.3)" }}
      className="my-5"
    >
      <Carousel.Item interval={5000}>
        <img
          className="d-block  mx-auto"
          src={img1}
          alt="First slide"
          style={{ width: "100%", height: "50%" }}
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block  mx-auto"
          src={img2}
          alt="Second slide"
          style={{ width: "100%", height: "50%" }}
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block  mx-auto"
          src={img3}
          alt="Third slide"
          style={{ width: "100%", height: "50%" }}
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block  mx-auto"
          src={img4}
          alt="Third slide"
          style={{ width: "100%", height: "50%" }}
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block  mx-auto"
          src={img5}
          alt="Third slide"
          style={{ width: "100%", height: "50%" }}
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
