import React from 'react'

export default function UploadFile() {
  return (
    <form action="/products" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
    </form>
  )
}
