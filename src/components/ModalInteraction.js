import React from "react";
import { Modal } from "react-bootstrap";

const ModalInteraction = ({ showModal, handleClose, interaction }) => {
  return (
    <>
      <Modal show={showModal} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title>
            <div className='title-h5'>Check Interaction</div>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!interaction && <h6>0 interaction found</h6>}
          {interaction && (
            <>
              <h6>
                {interaction?.sourceName &&
                  `Source: ${interaction.sourceName} `}
              </h6>
              <div>
                {interaction &&
                  interaction?.fullInteractionType &&
                  interaction?.fullInteractionType.map((i) => (
                    <>
                      <div className='mt-2'>
                        {i?.interactionPair &&
                          i.interactionPair.map((p) => (
                            <div>{p.description}</div>
                          ))}
                      </div>
                    </>
                  ))}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInteraction;
