import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../assets/imagenes/logo1.png"; // Ajusta la ruta según tu estructura de archivos
import NewImage from "../assets/imagenes/glem1.png"; // Nueva imagen
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa"; // Importar los iconos de react-icons

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Para controlar el tamaño de la imagen
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "http://localhost:3001/api/auth/login",
            { correo, contrasena },
            { withCredentials: true }
        );

        const { accessToken } = response.data;
        console.log("Access Token recibido:", accessToken);

        // Almacena el token y redirige según el rol
        localStorage.setItem("accessToken", accessToken);
        const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
        const userRole = decodedToken.rol;
        console.log("Rol del usuario:", userRole);

        switch (userRole) {
            case "superadmin":
                navigate("/superadmin");
                break;
            case "admin":
                navigate("/admin");
                break;
            default:
                toast.error("Rol no reconocido. Contacta al administrador.");
                break;
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || "Credenciales inválidas");
        } else {
            toast.error("Error de conexión. Intenta nuevamente.");
        }
    }
};


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sección izquierda (fondo azul con la imagen arriba del formulario) */}
      <div className="flex-1 bg-gradient-to-br from-blue-800 to-blue-900 text-white flex flex-col items-center justify-center p-8">
        {/* Imagen arriba del formulario con tamaño dinámico */}
        <div className="mb-2">
          <img
            src={Logo} // Asegúrate de que la imagen esté en la carpeta correcta
            alt="Logo"
            className="w-14 h-14 animate-bounce motion-reduce:animate-none"
            style={{ animationDuration: "4s" }} // Aquí defines la duración personalizada
          />
        </div>
        <form
          onSubmit={handleLogin}
          className="space-y-6 w-full max-w-sm bg-gray-200 p-6 rounded-3xl shadow-xl text-gray-900"
        >
          <h2 className="text-3xl font-extrabold text-black mb-4 text-center">
            Bienvenido
          </h2>
          <p className="text-sm text-black text-center mb-6">
            Inicia sesión para acceder a tu cuenta
          </p>

          <div>
            <div className="relative">
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="block w-full border-2 border-blue-800 rounded-xl p-3 pl-12 focus:outline-none focus:border-blue-600"
                placeholder="Ingresa tu correo"
                required
              />
              {/* Icono dentro del input de correo */}
              <FaEnvelope className="absolute top-3 left-4 text-blue-800" />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="block w-full border-2 border-blue-800 rounded-xl p-3 pl-12 focus:outline-none focus:border-blue-600"
                placeholder="Ingresa tu contraseña"
                required
              />
              {/* Icono dentro del input de contraseña */}
              <FaLock className="absolute top-3 left-4 text-blue-800" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>INGRESAR</span>
          </button>
          <div className="flex justify-center text-sm mt-4">
            <a href="#" className="text-blue-800 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>

      {/* Sección derecha (logo y descripción) */}
      <div className="flex-1 bg-gray-200 text-center flex flex-col justify-center items-center p-6">
        {/* Imagen encima de la descripción */}
        <div className="mb-6">
          <img
            src={NewImage} // La nueva imagen que aparece encima de "GESTION+"
            alt="Nueva Imagen"
            className="w-60 h-50 object-contain mx-auto" // Añadido mx-auto para centrar horizontalmente
          />
          <h2 className="text-2xl mb-2 text-gray-700">Optimiza tu Energía</h2>
          <p className="text-lg text-black">
            La herramienta para una gestión energética más eficiente e
            inteligente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
