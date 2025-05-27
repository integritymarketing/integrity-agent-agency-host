const Container = ({ size = "default", className = "", ...props }) => {
  return (
    <div
      className={`container container--size-${size} ${className}`}
      {...props}
    ></div>
  );
};

export default Container;
