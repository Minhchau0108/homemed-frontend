import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AlertMsg from "../components/AlertMsg";
import DoctorAppointDetail from "../pages/AdminDoctor/DoctorAppointDetail";
import DoctorAppointPage from "../pages/AdminDoctor/DoctorAppointPage";
import DoctorCreatePost from "../pages/AdminDoctor/DoctorCreatePost";
import DoctorPostPage from "../pages/AdminDoctor/DoctorPostPage";
import DoctorSideBar from "../pages/AdminDoctor/DoctorSideBar";

const AdminDoctorLayout = () => {
  return (
    <>
      <AdminNavbar title={`Doctor Dashboard`} />
      <Container fluid>
        <Row>
          <DoctorSideBar />
          <Col className='bg-light' style={{ minHeight: "95vh" }}>
            <AlertMsg />
            <Switch>
              <Route
                exact
                path='/admin-doctor/appointments'
                component={DoctorAppointPage}
              />
              <Route
                exact
                path='/admin-doctor/posts'
                component={DoctorPostPage}
              />
              <Route
                exact
                path='/admin-doctor/create-post'
                component={DoctorCreatePost}
              />
              <Route
                exact
                path='/admin-doctor/appointments/:id'
                component={DoctorAppointDetail}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDoctorLayout;
