import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { contactRequest, clearContactReducer } from '../actions/contactActions';

const customModalStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -10%)',
  },
};

export default function About() {
  const dispatch = useDispatch();
  const { contact, contactError } = useSelector((state) => state.contact);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactNameErr, setContactNameErr] = useState('');
  const [contactEmailErr, setContactEmailErr] = useState('');
  const [contactMessageErr, setContactMessageErr] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  Modal.setAppElement('#modal');

  useEffect(() => () => {
    dispatch(clearContactReducer());
  }, []);

  useEffect(() => {
    setModalIsOpen(true);
  }, [contact, contactError]);

  // Submit a contact request form
  function handleSubmit(e) {
    e.preventDefault();

    const values = {
      contactName,
      contactEmail,
      contactMessage,
    };

    if (!contactName) setContactNameErr('Required!');
    if (!contactEmail) setContactEmailErr('Required!');
    if (!contactMessage) setContactMessageErr('Required!');

    if (contactNameErr || contactEmailErr || contactMessageErr) {
      return;
    }

    dispatch(contactRequest(values));
  }

  // Handle form change
  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        if (value === '') {
          setContactName('');
          setContactNameErr('Required!');
        } else {
          setContactNameErr('');
          setContactName(value);
        }

        break;

      case 'email':
        if (value === '') {
          setContactEmail('');
          setContactEmailErr('Required!');
        } else {
          setContactEmailErr('');
          setContactEmail(value);
        }

        break;

      case 'message':
        if (value === '') {
          setContactMessage('');
          setContactMessageErr('Required!');
        } else {
          setContactMessageErr('');
          setContactMessage(value);
        }

        break;

      default:
        break;
    }
  }

  return (
    <div className="about">
      <div className="about-container mt-1">
        <div className="about-introduction">
          <h1 className="mb-1 txt-bold">VRA E-commerce</h1>
          <p>
            VRA E-commerce is a small shop that sells different appareals.
            Our goal is to offer our customers unforgettable fashion experiences
            and excellent customer service.
            Whole page is built and managed by Renar,
            who is trying his best to make the whole purchasing process as easy as possible.
            Feel free to register our club and start shopping.
            All questions, suggestions are welcomed via form down below.
          </p>
          <div className="line" />
        </div>
        <div className="about-illustration">
          <img src="./storefront_illustration.png" alt="Store illustration" />
        </div>
      </div>

      <form className="about-form">
        <h1 className="mb-2">Have a Question? Contact Us</h1>
        <label
          htmlFor="name"
          className={contactNameErr ? 'err' : ''}
        >
          Name*
        </label>
        <input
          className={contactNameErr ? 'input-err' : ''}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <label
          htmlFor="email"
          className={contactEmailErr ? 'err' : ''}
        >
          Email*
        </label>
        <input
          className={contactEmailErr ? 'input-err' : ''}
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
        />

        <label
          htmlFor="message"
          className={contactMessageErr ? 'err' : ''}
        >
          Message*
        </label>
        <textarea
          className={contactMessageErr ? 'input-err' : ''}
          name="message"
          placeholder="Your message"
          onChange={handleChange}
        />

        <input
          className="btn mt-3"
          type="submit"
          value="Send message"
          onClick={(e) => handleSubmit(e)}
        />
      </form>

      {contact && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{contact}</h2>
        </Modal>
      )}

      {contactError && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{contactError}</h2>
        </Modal>
      )}
    </div>
  );
}
