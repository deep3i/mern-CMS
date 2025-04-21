import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import CustomerPage from './CustomerTable';
import AddCustomerModal from './AddCustomer';
import { getCustomersAsync } from '../../redux/customer';
import { getAllCustomerDetail } from '../../redux/customer/slice';

const MainIndex = () => {
  const dispatch = useDispatch();
  const { isCustomerLoading, customers } = useSelector(getAllCustomerDetail);
  const [showAddModal, setShowAddModal] = useState(false);
  const [call, setCall] = useState(false);

  useEffect(() => {
    dispatch(getCustomersAsync({}));
  }, [call]);

  const handleCall = () => {
    setCall(!call);
  };

  const handleOpen = () => {
    setShowAddModal(!showAddModal);
  };
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <CustomerPage handleCall={handleCall} customers={customers} isCustomerLoading={isCustomerLoading} handleOpen={handleOpen} />
      </div>
      <AddCustomerModal
        handleCall={handleCall}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default MainIndex;