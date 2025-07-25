import { useState } from "react";

const Card = ({ source, alt }) => {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  return (
    <img
      src={source}
      alt={alt}
      onError={() => {
        setError(true);
      }}
    />
  );
};

export default Card;
