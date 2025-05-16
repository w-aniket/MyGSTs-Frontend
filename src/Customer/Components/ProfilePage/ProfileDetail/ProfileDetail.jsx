
import PersonelDetail from "./PersonelDetail";
import Address from "./Address";
import Education from "./Education";
import "./ProfileDetail.css";

const ProfileDetail = () => {
  
  return (
    <div>
      <div>
        <PersonelDetail /> 
        <Address /> 
        <Education />
      </div>
    </div>
  );
};

export default ProfileDetail;
