    import { useState, useContext } from "react";
    import { useNavigate } from "react-router-dom";
    import { login } from "../../services/authService";
    import { AuthContext } from "../../context/AuthContext";
    import bgLogin from "../../assets/bg-login.jpg";
    import logo from "../../assets/bcskills-logo.png";

    const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setRole } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const res = await login(email, password);
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("role", res.role);
        setRole(res.role);

        if (res.role === "FLEET_ADMIN") navigate("/dashboard");
        else if (res.role === "FOURNISSEUR")
            navigate("/mes-vehicles-fournisseur");
        else navigate("/vehicules-disponibles");
        } catch (error) {
        alert("Login failed. Please check credentials.");
        }
    };

    return (
        <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{
            backgroundImage: `url(${bgLogin})`,
        }}
        >
        <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md bg-white/30 shadow-2xl rounded-xl px-10 py-8 w-[90%] max-w-md flex flex-col items-center"
        >
            <img
            src={logo}
            alt="BC SKILLS Logo"
            className="w-24 h-24 mb-4 drop-shadow-md"
            />
            <h2 className="text-2xl font-bold text-blue-500  mb-6 drop-shadow-md">
            Se connecter
            </h2>

            <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-3 rounded-lg bg-white/90 placeholder-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 rounded-lg bg-white/90 placeholder-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
            Connexion
            </button>

            <p className="text-center text-white text-sm mt-4">
            Pas de compte ?{" "}
            <a
                href="/register"
                className="underline text-blue-100 hover:text-white"
            >
                Inscrivez-vous
            </a>
            </p>
        </form>
        </div>
    );
    };

    export default LoginPage;
