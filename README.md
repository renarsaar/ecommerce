# General Info:
Project is hosted on [Heroku](https://vra-ecommerce.herokuapp.com/).<br />
React.js side of the applicattion is in **client** folder.<br />
Express.js server of the applicattion is in **server** folder.<br />

## Features in this application:
- Full CRUD application with Products, Users, Reviews, Orders
- JWT authentication & authorization
- Google Oauth login/register functionality
- Option to link google account with current account
- Sending Emails & pdf files in case of order changes
- Different User roles, option to lock accounts and give premissions

## Media Queries are not completed and currently the application is not usable with screens under 1200 px
## Admin account for testing, please use it wisely
```
Username: admin@vra.ee
Password: Admin12345
```

## File Structure:
```
.gitignore
README.md
client
   |-- .eslintrc.json
   |-- debug.log
   |-- package-lock.json
   |-- package.json
   |-- public
   |   |-- index.html
   |   |-- ...
   |-- src
   |   |-- Components
   |   |   |-- About.js
   |   |   |-- App.js
   |   |   |-- Catalog.js
   |   |   |-- Fabric.js
   |   |   |-- Filter.js
   |   |   |-- Footer.js
   |   |   |-- Header.js
   |   |   |-- Hooks
   |   |   |   |-- useFormattedCreditCardNumber.js
   |   |   |   |-- useHandleOrderBackground.js
   |   |   |   |-- useRippleButton.js
   |   |   |-- Journal.js
   |   |   |-- Modals
   |   |   |   |-- CartModal.js
   |   |   |   |-- FooterModals
   |   |   |   |   |-- PrivacyPolicyModal.js
   |   |   |   |   |-- ProductCareModal.js
   |   |   |   |   |-- ShippingModal.js
   |   |   |   |   |-- SizeGuideModal.js
   |   |   |   |   |-- Testimonials.js
   |   |   |   |   |-- TestimonialsModal.js
   |   |   |   |-- WishListModal.js
   |   |   |-- SearchBar.js
   |   |   |-- SubHeader.js
   |   |   |-- account
   |   |   |   |-- AccountLogo.js
   |   |   |   |-- AccountSplashScreen.js
   |   |   |   |-- Admin.js
   |   |   |   |-- ChangePasswordForm.js
   |   |   |   |-- DeleteAccountForm.js
   |   |   |   |-- LogIn.js
   |   |   |   |-- Register.js
   |   |   |   |-- ResetPassword.js
   |   |   |   |-- ResetPasswordConfirm.js
   |   |   |   |-- User.js
   |   |   |   |-- UserShow.js
   |   |   |   |-- Validation.js
   |   |   |-- orders
   |   |   |   |-- OrderCreate.js
   |   |   |   |-- OrderCreateForm
   |   |   |   |   |-- CartSuccess.js
   |   |   |   |   |-- FormCartProducts.js
   |   |   |   |   |-- FormConfirm.js
   |   |   |   |   |-- FormPersonalDetails.js
   |   |   |   |   |-- ProgressBar.js
   |   |   |   |-- OrderShow.js
   |   |   |-- products
   |   |   |   |-- Product.js
   |   |   |   |-- ProductChangeForm.js
   |   |   |   |-- ProductCreate.js
   |   |   |   |-- ProductDelete.js
   |   |   |   |-- ProductEdit.js
   |   |   |   |-- ProductGridPlaceholder.js
   |   |   |   |-- ProductList.js
   |   |   |   |-- ProductPreview.js
   |   |   |   |-- ProductShow.js
   |   |-- actions
   |   |   |-- authActions.js
   |   |   |-- cartActions.js
   |   |   |-- contactActions.js
   |   |   |-- filterActions.js
   |   |   |-- menuActions.js
   |   |   |-- orderActions.js
   |   |   |-- productsActions.js
   |   |   |-- reviewActions.js
   |   |   |-- sortActions.js
   |   |   |-- types.js
   |   |   |-- viewActions.js
   |   |   |-- wishListActions.js
   |   |-- api
   |   |   |-- index.js
   |   |-- css
   |   |   |-- main.css
   |   |-- history.js
   |   |-- index.js
   |   |-- reducers
   |   |   |-- authReducer.js
   |   |   |-- cartReducer.js
   |   |   |-- contactReducer.js
   |   |   |-- filterReducer.js
   |   |   |-- index.js
   |   |   |-- menuReducer.js
   |   |   |-- orderReducer.js
   |   |   |-- productsReducer.js
   |   |   |-- reviewReducer.js
   |   |   |-- sortReducer.js
   |   |   |-- viewReducer.js
   |   |   |-- wishListReducer.js
   |   |-- scss
   |   |   |-- _media.scss
   |   |   |-- main.scss
   |   |-- serviceWorker.js
   |   |-- setupTests.js
server
   |-- .eslintrc.json
   |-- db.js
   |-- helpers
   |   |-- SortProducts.js
   |-- middleware
   |   |-- auth.js
   |-- model
   |   |-- Order.js
   |   |-- Product.js
   |   |-- Review.js
   |   |-- Token.js
   |   |-- User.js
   |-- orderPDF
   |   |-- 623f0e1e84378b1360b57e3b.pdf
   |-- package-lock.json
   |-- package.json
   |-- routes
   |   |-- auth.js
   |   |-- contact.js
   |   |-- orders.js
   |   |-- parcels.js
   |   |-- products.js
   |   |-- reviews.js
   |-- server.js
   |-- uploads
   |   |-- image1.jpg
   |   |-- ...
   |-- validation.js
```

## Usage
Install Client dependencies
```
cd client/ && npm install
```
Install Server dependencies
```
cd server/ && npm install
```
Start server - [http://localhost:8080](http://localhost:8080).
```
cd server/ && npm run dev
```
Start client - [http://localhost:3000](http://localhost:3000).
```
cd client/ && npm start
```
