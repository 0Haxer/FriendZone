import PropTypes from "prop-types";

const NotificationInNumber = ({ total }) => {
  return (
    <span className="bg-primary-shade rounded-full w-6 h-6 flex flex-row items-center justify-center p-2 text-text-color">
      {total}
    </span>
  );
};

NotificationInNumber.propTypes = {
  total: PropTypes.number,
};

export default NotificationInNumber;
