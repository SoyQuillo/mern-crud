import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });


  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.length > 0 &&
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-1 rounded" key={i}>
              {error}
            </div>
          ))}

        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Ingrese el Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Ingrese la contraseña"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Dont have an account?{" "}
          <Link className="text-sky-500" to="/register">
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
