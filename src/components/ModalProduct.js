import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import cartActions from "../redux/actions/cart.actions";
import { useDispatch } from "react-redux";

const ModalProduct = ({ show, handleClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(cartActions.addProductToCart(product, quantity));
  };
  return (
    <Modal show={show} onHide={handleClose} centered size='lg'>
      <div className='modal-content '>
        <div className='modal-body p-0 mb-5'>
          <Row className='align-items-stretch'>
            <Col lg={5}>
              <div
                className='product-view d-block h-100 bg-cover bg-center'
                style={{
                  backgroundImage: `url(${product?.images[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>
            </Col>
            <Col lg={7}>
              <button className='close p-4' onClick={handleClose}>
                <span aria-hidden='true'>×</span>
              </button>
              <h2 className='h4 mt-5'>{product.name}</h2>
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
              <p className='text-muted'>
                {new Intl.NumberFormat().format(product.price)} VND
              </p>
              <p className='text-small mb-4'>{product.indication}</p>
              <Row className='align-items-stretch mb-4'>
                <Col sm={5} className='px-0'>
                  <div className='border d-flex align-items-center justify-content-between py-1 px-3'>
                    <span className='small text-uppercase text-gray mr-4 no-select'>
                      Quantity
                    </span>
                    <div className='quantity mr-3'>
                      <button
                        className='dec-btn p-0'
                        onClick={() =>
                          setQuantity(quantity > 1 ? quantity - 1 : 1)
                        }
                      >
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </button>
                      <span className='btn mr-2'>{quantity}</span>
                      <button
                        className='inc-btn p-0 pr-2'
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                  </div>
                </Col>
                <Col sm={4} className='pl-sm-0'>
                  <button
                    className='btn btn-primary btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0'
                    onClick={handleAddToCart}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className='py-1 mr-2'
                      size='2x'
                    />
                    Add to cart
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProduct;
