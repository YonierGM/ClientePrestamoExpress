import "./HeaderUsuario.css";

export const HeaderUsuario = () => {
  return (
    <div className="HeaderUser">
      <nav>
        <div className="item">

        </div>
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="" className="active">Historial</a></li>
          <li><a href="">Solicitud</a></li>
        </ul>

        <div className="infoUser">
        <div className="infoUser-descripcion">
          <p className="name">NameUser</p>
          <p className="rol">Usuario</p>
        </div>
        <div className="avatarUser">
          <img
            src="https://pbs.twimg.com/profile_images/1097068834803073024/4Y8-lvQE_400x400.png"
            alt="Foto Administrador"
          />
        </div>
      </div>
      </nav>
    </div>
  );
};

export default HeaderUsuario
