import React, { useState } from "react";
import { dataOrders } from "../DataMethFuc/data";
import { formatPrice } from "../DataMethFuc/CountDown";

const ManageOrders = () => {
  const [ nameOrder, setNameOrder ] = useState('');
  const filterOrderBySearch = dataOrders.filter((o) => {
    const valueOrder = o.code.includes(nameOrder);
    return valueOrder;
  });
  const handleSearchOrders = (e) => {
    setNameOrder(e.target.value)
  };

  return (
    <div className="w-100 bg-white h-auto mt-4">
      <div className=" h-auto">
        <div className="d-flex flex-row justify-content-between p-3  me-2">
          <div className="fs-3 fw-semibold">Quản lý đặt hàng</div>
          
          <input 
            type="input"
            value={nameOrder}
            onChange={handleSearchOrders}
            placeholder="Tìm kiếm đơn hàng..."
            style={{width:'250px'}}
            className="p-2"
          />
        </div>
        <div className="w-100 p-4 d-flex flex-column">
          <div className="d-flex flex-row  p-2 rounded-top"  style={{backgroundImage: 'linear-gradient(to right, #00d4ff , #090979)'}}>
            <div className="fw-medium  w-25" style={{width: ''}}>Mã đơn hàng</div>
            <div className="fw-medium text-white w-25"style={{width: ''}}>Tổng tiền</div>
            <div className="fw-medium text-white w-25"style={{width: ''}}>Ngày đặt</div>
            <div className="fw-medium text-white w-25"style={{width: ''}}>Chi tiết</div>
          </div>

            {filterOrderBySearch.map((order, index) => (
              <div key={order.id} className={`d-flex flex-row justify-content-between text-wrap border border-top-0 p-2 ${index % 2 !== 0 ? 'bg-primary bg-opacity-25' : ''}`}>
                <div className="fw-medium w-25" style={{width: ''}}>{order.code}</div>
                <div className="fw-medium w-25"  style={{width: ''}}>{formatPrice(order.totalPrice)}0đ</div>
                <div className="fw-medium w-25"  style={{width: ''}}>{order.date}</div>
                <div className=" text-primary w-25"  style={{width: ''}}>Xem chi tiết</div>
                
              </div>
            ))}

        </div>
      </div>
    </div>
  );
};

export default ManageOrders;