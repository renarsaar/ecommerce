import React from 'react';
import ReactDOM from 'react-dom';
import Testimonials from './Testimonials';

export default function TestimonialsModal({ showTestimonials, handleClose }) {
  const modalClassName = showTestimonials === true ? 'testimonials-modal visible' : 'testimonials-modal hidden';

  return ReactDOM.createPortal(
    <div className={modalClassName} onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal">
          <button type="button" onClick={handleClose}>
            X
          </button>
        </div>

        <h1 className="mt-2 ml-2">Testimonials</h1>

        <Testimonials
          name="Chris Fox."
          position="CEO at Mighty Schools."
          testimonial="VRA saved us from a web disaster."
          imageSrc="https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
        />

        <Testimonials
          name="Rebecca Flex."
          position="CEO at Company."
          testimonial="Nothing is better than VRA."
          imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        />

        <Testimonials
          name="John Doe."
          position="Marketing Specialist at Web Company."
          testimonial="Phenomenal shopping experience."
          imageSrc="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
        />
      </div>
    </div>,
    document.getElementById('testimonials'),
  );
}
