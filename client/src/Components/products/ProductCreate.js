import React from 'react';

export default function ProductCreate() {
  return (
    <div>
      ProductCreate
      <form action="/products" method="post" encType="multipart/form-data">
        <input type="file" name="image" />
      </form>
    </div>
  );
}
