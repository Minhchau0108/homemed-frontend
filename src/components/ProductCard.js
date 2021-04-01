import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import cartActions from "../redux/actions/cart.actions";
import StarRatings from "react-star-ratings";
import ModalProduct from "./ModalProduct";

const CardOverlay = ({ product, handleShowModal }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='product-overlay mb-0'>
        <ul className='mb-0 list-inline p-0'>
          <li className='list-item mb-2'>
            <button
              className='btn btn-pills btn-soft-primary'
              onClick={handleShowModal}
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </li>
          <li className='list-item '>
            {product?.isPrescription === false && (
              <button
                style={{ paddingLeft: "8px" }}
                className='btn btn-pills btn-soft-primary'
                onClick={() =>
                  dispatch(cartActions.addProductToCart(product, 1))
                }
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

const ProductCard = ({ product }) => {
  const [showModalProduct, setShowModalProduct] = useState(false);
  return (
    <>
      <Card className='border-0 mb-3'>
        <div className='position-relative product shadow'>
          <div className='position-relative'>
            {/* <span className='badge badge-pill badge-success small'>
              Prescription
            </span> */}
            <img src={product.images[0]} alt='' className='img-fluid' />
            <CardOverlay
              product={product}
              handleShowModal={() => setShowModalProduct(true)}
            />
          </div>
        </div>

        <Card.Body className='card-body p-2'>
          <Link to={`/shop/${product._id}`} className='text-decoration-none'>
            <h6 className='mb-0 text-dark'>{product.name.substring(0, 30)}</h6>
          </Link>

          <div className='d-flex justify-content-between mt-1'>
            <h6 className='text-muted font-italic mb-0'>
              {new Intl.NumberFormat().format(product.price)} VND
            </h6>
            {product?.avgRating && (
              <StarRatings
                rating={product?.avgRating}
                starRatedColor='#FFC107'
                numberOfStars={5}
                name='rating'
                starDimension='14px'
                starSpacing='1px'
              />
            )}
          </div>
        </Card.Body>
        <ModalProduct
          product={product}
          show={showModalProduct}
          handleClose={() => setShowModalProduct(false)}
        />
      </Card>
    </>
  );
};

export default ProductCard;
