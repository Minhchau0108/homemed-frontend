import React from "react";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import PublicNavbar from "../components/PublicNavbar";
import RegisterPage from "../pages/AuthPages/RegisterPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import BlogHomePage from "../pages/BlogPages/BlogHomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../pages/PharmaPages/ShopPage";
import DetailProductPage from "../pages/PharmaPages/DetailProductPage";
import DoctorsPage from "../pages/DoctorPages/DoctorsPage";
import DoctorDetailPage from "../pages/DoctorPages/DoctorDetailPage";
import BlogDetailPage from "../pages/BlogPages/BlogDetailPage";
import FooterBar from "../components/FooterBar";
import CreateAppointmentPage from "../pages/DoctorPages/CreateAppointmentPage";
import CreatePrescriptionPage from "../pages/PharmaPages/CreatePrescriptionPage";
import CartPage from "../pages/ShopPages/CartPage";
import CheckoutPage from "../pages/ShopPages/CheckoutPage";
import CategoryPage from "../pages/PharmaPages/CategoryPage";
import ThankYouPage from "../pages/ShopPages/ThankYouPage";
import LandingPage from "../pages/PharmaPages/LandingPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />

      <AlertMsg />
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={LandingPage} />
        <Route exact path='/pharmacy' component={ShopPage} />
        <Route
          exact
          path='/pharmacy/create-prescription'
          component={CreatePrescriptionPage}
        />
        <Route exact path='/category/:mainCategory' component={CategoryPage} />
        <Route exact path='/shop/:id' component={DetailProductPage} />

        <Route
          exact
          path='/doctors/create-appointment'
          component={CreateAppointmentPage}
        />
        <Route exact path='/doctors' component={DoctorsPage} />
        <Route exact path='/doctors/:id' component={DoctorDetailPage} />
        <Route exact path='/blogs' component={BlogHomePage} />
        <Route exact path='/blogs/:id' component={BlogDetailPage} />
        <Route exact path='/cart' component={CartPage} />
        <Route exact path='/cart/checkout' component={CheckoutPage} />
        <Route exact path='/cart/thankyou' component={ThankYouPage} />
        <Route component={NotFoundPage} />
      </Switch>

      <FooterBar />
    </>
  );
};

export default PublicLayout;
