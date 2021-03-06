import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions/auth.actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile,
  faTruck,
  faPhone,
  faTags,
  faSearch,
  faStethoscope,
  faCapsules,
  faHeartbeat,
  faBaby,
  faAllergies,
  faHeadSideVirus,
  faFemale,
  faUserMd,
  faPhoneAlt,
  faCameraRetro,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(
  fab,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile,
  faTruck,
  faPhone,
  faTags,
  faSearch,
  faStethoscope,
  faCapsules,
  faHeartbeat,
  faBaby,
  faAllergies,
  faHeadSideVirus,
  faFemale,
  faUserMd,
  faPhoneAlt,
  faCameraRetro,
  faPhoneVolume
);
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);
  return (
    <>
      <div className='App'>
        <Router>
          <Routes />
        </Router>
      </div>
    </>
  );
}

export default App;
