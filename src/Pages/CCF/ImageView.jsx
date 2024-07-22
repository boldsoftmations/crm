import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CustomLoader } from "../../Components/CustomLoader";

const StyledTableCell = styled.td`
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: ${(props) => (props.isEnlarged ? "550px" : "200px")}; // Updated size
  height: auto;
  margin: 10px;
  cursor: pointer;
  transition: width 0.5s ease-in-out;
`;

const Message = styled.div`
  margin: 20px;
  font-size: 18px;
  color: #777;
`;

const Loader = styled.div`
  margin: 20px;
  font-size: 18px;
  color: #777;
  text-align: center;
`;

const ImageView = ({ imagesData }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, [imagesData]);

  const handleImageClick = (image) => {
    setEnlargedImage(enlargedImage === image ? null : image);
  };

  return (
    <StyledTableCell>
      {loading ? (
        <CustomLoader open={loading} />
      ) : imagesData.length === 0 ? (
        <Message>No images available</Message>
      ) : (
        <ImageContainer>
          {imagesData.map((image, index) => (
            <Image
              key={index}
              src={image.file}
              alt={`Image ${index + 1}`}
              isEnlarged={enlargedImage === image}
              onClick={() => handleImageClick(image)}
              onLoad={() => setLoading(false)} // Ensure loading state is updated
            />
          ))}
        </ImageContainer>
      )}
    </StyledTableCell>
  );
};

export default ImageView;
