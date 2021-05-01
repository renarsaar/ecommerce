import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactRequest, clearContactReducer } from '../actions/contactActions';
import Modal from 'react-modal';

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
  const { contactLoading, contact, contactError } = useSelector((state) => state.contact);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [messageErr, setMessageErr] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  Modal.setAppElement('#modal');

  useEffect(() => {
    return () => {
      dispatch(clearContactReducer());
    }
  }, []);

  useEffect(() => {
    setModalIsOpen(true);
  }, [contact, contactError]);

  // Submit a contact request form
  function handleSubmit(e) {
    e.preventDefault();

    const values = {
      name,
      email,
      message,
    };

    if (!name) setNameErr('Required!');
    if (!email) setEmailErr('Required!');
    if (!message) setMessageErr('Required!');

    if (nameErr || emailErr || messageErr) {
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
          setName('');
          setNameErr('Required!');
        } else {
          setNameErr('');
          setName(value);
        }

        break;

      case 'email':
        if (value === '') {
          setEmail('');
          setEmailErr('Required!');
        } else {
          setEmailErr('');
          setEmail(value);
        }

        break;

      case 'message':
        if (value === '') {
          setMessage('');
          setMessageErr('Required!');
        } else {
          setMessageErr('');
          setMessage(value);
        }

        break;

      default:
        break;
    }
  }

  // Email regex
  function validateEmail(e) {
    const { value } = e.target;
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(value)) {
      setEmailErr('Invalid Email!');
    } else {
      setEmailErr('');
    }
  }

  return (
    <div className="about">
      <div className="about-container mt-1">
        <div className="about-introduction">
          <h1 className="mb-1 txt-bold">VRA E-commerce</h1>
          <p>VRA E-commerce is a small shop that sells different appareals. Our goal is to offer our customers unforgettable fashion experiences and excellent customer service. Whole page is built and managed by Renar, who is trying his best to make the whole purchasing process as easy as possible. Feel free to register our club and start shopping. All questions, suggestions are welcomed via form down below.</p>
          <div className="line" />
        </div>
        <div className="about-illustration">
          <img src="./storefront_illustration.png" />
        </div>
      </div>

      <form className="about-form">
        <h1 className="mb-2">Have a Question? Contact Us</h1>
        <label
          htmlFor="name"
          className={nameErr ? 'err' : ''}
        >
          Name*
        </label>
        <input
          className={nameErr ? 'input-err' : ''}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <label
          htmlFor="email"
          className={emailErr ? 'err' : ''}
        >
          Email*
        </label>
        <input
          className={emailErr ? 'input-err' : ''}
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          onBlur={validateEmail}
        />

        <label
          htmlFor="message"
          className={messageErr ? 'err' : ''}
        >
          Message*
        </label>
        <textarea
          className={messageErr ? 'input-err' : ''}
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
