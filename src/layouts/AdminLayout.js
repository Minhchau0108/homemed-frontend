import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AlertMsg from "../components/AlertMsg";
import AdminSideBar from "../pages/Admin/AdminSideBar";
import AdminOrderDetailPage from "../pages/Admin/Order/AdminOrderDetailPage";
import AdminOrderPage from "../pages/Admin/Order/AdminOrderPage";
import AdminDetailPrescription from "../pages/Admin/Prescription/AdminDetailPrescription";
import AdminPrescriptionPage from "../pages/Admin/Prescription/AdminPrescriptionPage";
import AdminCreateProduct from "../pages/Admin/Product/AdminCreateProduct";
import AdminProductPage from "../pages/Admin/Product/AdminProductPage";
import AdminCreateDoctorPage from "../pages/Admin/User/AdminCreateDoctorPage";
import AdminCustormerPage from "../pages/Admin/User/AdminCustormerPage";
import AdminDoctorPage from "../pages/Admin/User/AdminDoctorPage";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar title={`Admin Dashboard`} />
      <Container fluid>
        <Row>
          <AdminSideBar />
          <Col className='bg-light'>
            <AlertMsg />
            <Switch>
              <Route exact path='/admin/orders' component={AdminOrderPage} />
              <Route
                exact
                path='/admin/orders/:id'
                component={AdminOrderDetailPage}
              />
              <Route
                exact
                path='/admin/prescriptions'
                component={AdminPrescriptionPage}
              />
              <Route
                exact
                path='/admin/prescriptions/:id'
                component={AdminDetailPrescription}
              />
              <Route
                exact
                path='/admin/customers'
                component={AdminCustormerPage}
              />
              <Route exact path='/admin/doctors' component={AdminDoctorPage} />
              <Route
                exact
                path='/admin/create-doctor'
                component={AdminCreateDoctorPage}
              />
              <Route
                exact
                path='/admin/create-product'
                component={AdminCreateProduct}
              />
              <Route
                exact
                path='/admin/products'
                component={AdminProductPage}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
