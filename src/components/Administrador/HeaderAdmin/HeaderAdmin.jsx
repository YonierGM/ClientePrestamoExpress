import "./HeaderAdmin.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const HeaderAdmin = () => {
  return (
    <div className="header">
      <div className="input">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search by type" />
      </div>
      <div className="infoUser">
        <div className="infoUser-descripcion">
          <p className="name">NameUser</p>
          <p className="rol">Administrador</p>
        </div>
        <div className="avatarUser">
          <img
            src="https://pbs.twimg.com/profile_images/1097068834803073024/4Y8-lvQE_400x400.png"
            alt="Foto Administrador"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin
