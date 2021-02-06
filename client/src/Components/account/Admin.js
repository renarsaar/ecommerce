import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/orderActions';

export default function Admin() {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orders);

  return (
    <div className="dashboard">
      ADMIN
    </div>
  );
}
