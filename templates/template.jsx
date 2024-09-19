import react from "react";
import PropTypes from "prop-types";
import "./{{camelCase}}{{custom}}";

export const {{PascalCase}} = ({ prop }) => {
  return <div className="{{dash-case}}">
    This is the Original template
  </div>;
};

{{PascalCase}}.defaultProps = {
  prop: "",
};

{{PascalCase}}.propTypes = {
  prop: PropTypes.string,
};
