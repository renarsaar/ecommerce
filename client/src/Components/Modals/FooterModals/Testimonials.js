import React from 'react';

export default function Testimonials({
  name, position, testimonial, imageSrc,
}) {
  return (
    <div className="testimonial">
      <img src={imageSrc} alt="Avatar" />

      <div>
        <p><span>{name}</span> {position}</p>
        <p>{testimonial}</p>
      </div>
    </div>
  );
}
