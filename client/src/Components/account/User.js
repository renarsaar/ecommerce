import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../actions/orderActions';

export default function User() {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orders);

  return (
    <div className="dashboard">
      USER
    </div>
  );
}
