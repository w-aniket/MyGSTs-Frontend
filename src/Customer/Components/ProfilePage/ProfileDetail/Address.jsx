import React from "react";

const Address = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

  }
  return (
    <form >
          <h2>Permanent Address </h2>
      <div className="address-section">
        <div className="profile-form-group">
          <label>House No. *</label>
          <input type="text" name="houseNo" placeholder="House Number" required />
        </div>

        <div className="profile-form-group">
          <label>Street *</label>
          <input type="text" name="street" placeholder="Street" required />
        </div>

        <div className="profile-form-group">
          <label>Place *</label>
          <input type="text" name="place" placeholder="Place" required />
        </div>

        <div className="profile-form-group">
          <label>Pincode *</label>
          <input type="text" name="pincode" placeholder="Pincode" required />
        </div>

        <div className="profile-form-group">
          <label>Post Office *</label>
          <input type="text" name="postOffice" placeholder="Post Office" required />
        </div>

        <div className="profile-form-group">
          <label>City *</label>
          <input type="text" name="city" placeholder="City" required />
        </div>

        <div className="profile-form-group">
          <label>District *</label>
          <input type="text" name="district" placeholder="District" required />
        </div>

        <div className="profile-form-group">
          <label>State *</label>
          <input type="text" name="state" placeholder="State" required />
        </div>
      </div>
      <div className="button-wrapper">
      </div>
    </form>
  );
};

export default Address;
