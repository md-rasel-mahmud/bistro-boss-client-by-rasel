import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInWithGooglePopup } = useContext(AuthContext);

  // create navigate after login where want to go user
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    signInWithGooglePopup().then((result) => {
      const user = result.user;

      const saveUser = { name: user.displayName, email: user.email };

      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: "User Login Successful.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          navigate(from);

          console.log(data);
        });
    });
  };
  return (
    <>
      <div className="divider">OR</div>
      <div className="text-center mb-3">
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-circle"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
