import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CustomerPage from './CustomerTable';
import AddCustomerModal from './AddCustomer';

const MainIndex = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOpen = () => {
    setShowAddModal(!showAddModal);
  };
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <CustomerPage handleOpen={handleOpen} />
      </div>
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default MainIndex;