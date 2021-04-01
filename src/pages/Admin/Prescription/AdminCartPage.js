import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faCaretLeft,
  faCaretRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { orderActions } from "../../../redux/actions/order.actions";
import axios from "axios";

import ModalInteraction from "../../../components/ModalInteraction";

const AdminCartPage = ({
  prescription,
  cart,
  handleEmptyCart,
  addQuantity,
  subQuantity,
}) => {
  const [showModalInteraction, setShowModalInteraction] = useState(false);
  const [interaction, setInteraction] = useState(null);
  const dispatch = useDispatch();
  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      userId: prescription.owner._id,
      phone: prescription.phone,
      address: prescription.address,
      products: cart.products,
      totalPrice: cart.totalPrice,
      prescriptionId: prescription._id,
    };
    console.log("order", order);
    if (cart.products.length > 0) {
      dispatch(orderActions.createOrderByAdmin(order));
    }
  };

  const checkInteraction = async () => {
    try {
      let arrayRxId = [];
      for (let item of cart.products) {
        if (item?.rxId) {
          arrayRxId = [...arrayRxId, item.rxId];
        }
      }
      console.log("array", arrayRxId);
      let stringURL = arrayRxId.join("+");
      console.log("string URL", stringURL);
      let res;
      if (stringURL) {
        //const res = await axios.get(
        //("https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=1046408+104206");
        //);
        res = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${stringURL}`
        );
      }

      console.log("res", res);
      if (res?.data?.fullInteractionTypeGroup[0]) {
        setInteraction(res.data.fullInteractionTypeGroup[0]);
      }
    } catch (err) {
      console.log("err", err);
    }
    setShowModalInteraction(true);
  };
  const handleCloseModalInteraction = () => {
    setInteraction(null);
    setShowModalInteraction(false);
  };

  return (
    <>
      <Table>
        <thead className='bg-light'>
          <tr>
            <th className='border-0'>
              <div className='text-uppercase pt-2'>Product</div>
            </th>
            <th className='border-0'>
              <div className='text-uppercase pt-2'>Unit Price</div>
            </th>
            <th className='border-0'>
              <div className='text-uppercase pt-2'>Quantity</div>
            </th>
            <th className='border-0'>
              <div className='text-uppercase pt-2'></div>
            </th>
            <th className='border-0'></th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.products.map((product, idx) => (
              <tr key={idx}>
                <th className='pl-0 border-0' scope='row'>
                  <div className='media align-items-center'>
                    <img src={product?.images[0]} alt='...' width='50' />
                    <div className='media-body ml-3 h6'>{product?.name}</div>
                  </div>
                </th>
                <td className='align-middle border-0'>
                  <div className='mb-0'>
                    {new Intl.NumberFormat().format(product.price)}
                  </div>
                </td>
                <td className='align-middle border-0'>
                  <div className='d-flex align-items-center justify-content-between px-1'>
                    <div className='quantity p-0 m-0'>
                      <button
                        className='p-0'
                        onClick={() => subQuantity(product._id)}
                      >
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </button>
                      <span className='btn'>{product.qty}</span>
                      <button
                        className='p-0'
                        onClick={() => addQuantity(product._id)}
                      >
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                  </div>
                </td>
                <td className='align-middle border-0'>
                  <div className='mb-0 '>
                    {new Intl.NumberFormat().format(
                      product.qty * product.price
                    )}
                  </div>
                </td>
                <td className='align-middle border-0'>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleEmptyCart(product._id)}
                  />
                </td>
              </tr>
            ))}

          {cart.totaPrice > 0 && (
            <tr>
              <td></td>
              <td></td>
              <td className='title-h5 text-left pt-2'>Total</td>
              <td>{new Intl.NumberFormat().format(cart.totalPrice)}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {cart.totalPrice > 0 && (
        <div className='bg-light px-4 py-3'>
          <div className='row align-items-center text-center'>
            <div className='col-md-6 mb-3 mb-md-0 text-md-left'>
              <button
                className='btn  btn-soft-danger'
                onClick={checkInteraction}
              >
                Check drug interaction
              </button>
            </div>
            <div className='col-md-6 text-md-right'>
              <button className='btn btn-soft-primary' onClick={createOrder}>
                Order
                <FontAwesomeIcon icon={faLongArrowAltRight} className='ml-2' />
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalInteraction
        showModal={showModalInteraction}
        //handleClose={() => setShowModalInteraction(false)}
        handleClose={handleCloseModalInteraction}
        interaction={interaction}
      />
    </>
  );
};

export default AdminCartPage;
