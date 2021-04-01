import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import FooterBar from "../components/FooterBar";
import PublicNavbar from "../components/PublicNavbar";
import UserAppointmentPage from "../pages/UserPages/UserAppointmentPage";
import UserOrderDetailPage from "../pages/UserPages/UserOrderDetailPage";
import UserOrderPage from "../pages/UserPages/UserOrderPage";
import UserPrescriptionDetail from "../pages/UserPages/UserPrescriptionDetail";
import UserPresPage from "../pages/UserPages/UserPresPage";
import UserProfilePage from "../pages/UserPages/UserProfilePage";
import UserSideBar from "../pages/UserPages/UserSideBar";

const UserLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row className='mt-5'>
          <UserSideBar />
          <Col md={10} className='bg-light pt-5' style={{ minHeight: "70vh" }}>
            <AlertMsg />
            <Switch>
              <Route exact path='/user/profile' component={UserProfilePage} />
              <Route exact path='/user/orders' component={UserOrderPage} />
              <Route
                exact
                path='/user/orders/:id'
                component={UserOrderDetailPage}
              />
              <Route
                exact
                path='/user/prescriptions'
                component={UserPresPage}
              />
              <Route
                exact
                path='/user/prescriptions/:id'
                component={UserPrescriptionDetail}
              />
              <Route
                exact
                path='/user/appointments'
                component={UserAppointmentPage}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <FooterBar />
    </>
  );
};

export default UserLayout;
