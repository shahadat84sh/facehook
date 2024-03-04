import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../Common/Field";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData)

            if (response.status === 200) {
                const { token, user } = response.data;
                if (token) {
                    const authToken = token.token;
                    const refreshToken = token.refreshToken;
                    console.log('log in time auth token', token);
                    setAuth({ user, authToken, refreshToken });
                    navigate('/');
                }
            }


        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `User with email ${formData.email} is not found`
            })
        }

    }


    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(submitForm)}
        >
            <Field label="Email" error={errors.email}>
                <input
                    {...register("email", { required: "Email id Is require" })}
                    type="email"
                    className={`auth-input ${errors.email ? "border-red-500"
                        : "border-gray-200"
                        }`}
                    name="email"
                    id="email"
                />
            </Field>
            <Field label="Password" error={errors.password}>
                <input
                    {...register("password",
                        {
                            required: "Password Is required",
                            minLength: {
                                value: 8,
                                message: "Your password must be 8 charecters"
                            }
                        })}
                    type="password"
                    className={`auth-input ${errors.email ? "border-red-500"
                        : "border-gray-200"
                        }`}
                    name="password"
                    id="password"
                />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
                <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 mt-2">
                    Login
                </button>
            </Field>
        </form>
    )
};

export default LoginForm;