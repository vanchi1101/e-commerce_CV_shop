import React, { useState } from "react";
import { dataUsers } from "../DataMethFuc/data";

const ManageUsers = () => {
  const [ search, setSearch ] = useState('');
  const filterUserBySearch = dataUsers.filter((u) => {
    const valueSearch = u.username.toLowerCase().includes(search.trim().toLowerCase());
    return valueSearch;
  })

  const handleSearchUser = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="w-100 bg-white h-auto mt-5">
      <div className=" h-auto">
        <div className="d-flex flex-row justify-content-between px-4 ">
          <div className="fs-3 fw-semibold">Quản lý người dùng</div>
          <div className="btn btn-primary">Thêm người dùng</div>
        </div>
        <div className="d-flex flex-row-reverse p-2 mt-2 me-2">
          <input 
            type="input"
            value={search}
            onChange={handleSearchUser}
            placeholder="Tìm kiếm người dùng..."
            style={{width:'250px'}}
            className="p-2"
          />
        </div>
        <div className="w-100 p-4 d-flex flex-column">
          <div className="d-flex flex-row justify-content-between p-2 rounded-top"  style={{backgroundImage: 'linear-gradient(to right, #00d4ff , #090979)'}}>
            <div className="fw-medium ">Id</div>
            <div className="fw-medium text-white">Username</div>
            <div className="fw-medium text-white">Email</div>
            <div className="fw-medium text-white">Phone Number</div>
            <div className="fw-medium text-white">Action</div>
          </div>
          <div className="">
            {filterUserBySearch.map((u, index) => (
              <div key={u.id} className={`d-flex flex-row justify-content-between border border-top-0 p-2 ${index % 2 !== 0 ? 'bg-primary bg-opacity-25' : ''}`}>
                <div>{u.id}</div>
                <div>{u.username}</div>
                <div>{u.email}</div>
                <div>{u.phone}</div>
                <div>acc</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ManageUsers;