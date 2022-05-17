const { useSelector } = require("react-redux");

const AppURL = () => {
    const REACT_APP_BACKEND_ENPOINT_NOAPI = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT_NOAPI);
    return REACT_APP_BACKEND_ENPOINT_NOAPI;
}
export default AppURL;
