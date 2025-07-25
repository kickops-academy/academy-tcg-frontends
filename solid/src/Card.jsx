import { createSignal } from "solid-js";

const Card = ({
  source, 
  alt
}) => {
  const [error, setError] = createSignal(false);

  if (error()) return null;

  return (
    <img
      src={source}
      alt={alt}
      onError={(e) => {
        console.error(e);
        setError(true);
      }}
    />
  )
};

export default Card;
