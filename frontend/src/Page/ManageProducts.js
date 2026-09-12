import React, { useState} from "react";
import { dataItemsBig, categorys } from "../DataMethFuc/data";
import { formatPrice } from "../DataMethFuc/CountDown";
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";

const ManageProducts = () => {
  const [ search, setSearch ] = useState('');
  const [ selected, setSelected ] = useState('Tất cả')
  const filterUserBySearch = dataItemsBig.filter((p) => {
    const valueSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
    const valueSelect = selected === "Tất cả" || p.category === selected
    return valueSearch && valueSelect;
  });

  const handleSearchProducts = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSelect = (e) => {
    setSelected(e.target.value);
  };


  return (

    <div className="w-100 bg-white h-auto mt-5">
      <div className=" h-auto">
        <div className="d-flex flex-row justify-content-between px-4 ">
          <div className="fs-3 fw-semibold">Quản lý sản phẩm</div>
          <div className="btn btn-primary">Thêm sản phẩm</div>
        </div>
        <div className="d-flex flex-row justify-content-between p-3 mt-2 me-2">
          <select value={selected} onChange={handleSearchSelect} className="ms-2">
            {categorys.map((cate) => (
              <option key={cate} value={cate}>{cate}</option>
            ))}
          </select>
          <input 
            type="input"
            value={search}
            onChange={handleSearchProducts}
            placeholder="Tìm kiếm sản phẩm..."
            style={{width:'250px'}}
            className="p-2"
          />
        </div>
        <div className="w-100 p-4 d-flex flex-column">
          <div className="d-flex flex-row  p-2 rounded-top"  style={{backgroundImage: 'linear-gradient(to right, #00d4ff , #090979)'}}>
            <div className="fw-medium " style={{width: '90px'}}>STT</div>
            <div className="fw-medium text-white"style={{width: '100px'}}>Hình Ảnh</div>
            <div className="fw-medium text-white"style={{width: '230px'}}>Tên sản phẩm</div>
            <div className="fw-medium text-white"style={{width: '120px'}}>Hãng</div>
            <div className="fw-medium text-white"style={{width: '150px'}}>Giá bán</div>
            <div className="fw-medium text-white"style={{width: '410px'}}>Mô tả</div>
            <div className="fw-medium text-white text-end"style={{width: '100px'}}>Hành động</div>
          </div>

            {filterUserBySearch.map((item, index) => (
              <div key={item.id} className={`d-flex flex-row justify-content-between text-wrap border border-top-0 p-2 ${index % 2 !== 0 ? 'bg-primary bg-opacity-25' : ''}`} style={{height: '90px', fontSize:'14px'}}>
                <div className="fw-medium" style={{width: '90px'}}>{index +1}</div>
                <div className="fw-medium"  style={{width: '100px'}}>
                  <img src={item.image} alt="product" width={65} height={65}/>
                </div>
                <div className="fw-medium"  style={{width: '220px'}}>{item.name}</div>
                <div className="fw-medium"  style={{width: '120px'}}>{item.brand}</div>
                <div className="fw-medium"  style={{width: '150px'}}>{formatPrice(item.price)}0đ</div>
                <div className="fw-medium"  style={{width: '410px'}}>{index % 2 !== 0 ? (
                  <div>Bếp điện từ âm Samsung NZ64B5066FK/SV là một lựa chọn tuyệt vời cho những ai đang tìm kiếm một chiếc bếp từ hiện đại, đa năng và an toàn. Với nhiều tính năng ưu việt, bếp từ này sẽ giúp bạn nấu ăn ngon hơn và tiết kiệm thời gian hơn.</div>
                ): (
                  <div>Máy lọc nước nóng lạnh CNC800S-RS được sản xuất và nhập khẩu chính hãng Hàn Quốc, đảm bảo sự tin cậy cho khách hàng. Tính năng 2 trong 1 không chỉ cung cấp nguồn nước sạch tinh khiết mà còn rất tiện lợi và tiết kiệm thời gian. </div>
                )}</div>
                <div className="d-flex justify-content-center gap-2"  style={{width: '100px'}}>
                  <div className="fs-5"><FaRegEdit /></div>
                  <div className="fs-5"><GoTrash/></div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
};

export default ManageProducts;