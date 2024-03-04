
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../Common/Field";


export const RegisterForm = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const submitForm = async (formData) => {
        console.log(formData);
        try {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
                formData);
            if (response.status === 201) {
                navigate('/login')
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: `Something went wrong ${error.message}`
            })
        }
    }
    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
            onSubmit={handleSubmit(submitForm)}
        >
            <Field label="First Name" error={errors.firstName}>
                <input
                    {...register("firstName", { required: "firstName id Is require" })}
                    type="firstName"
                    className={`auth-input ${errors.firstName ? "border-red-500"
                        : "border-gray-200"
                        }`}
                    name="firstName"
                    id="firstName"
                />
            </Field>
            <Field label="LastName" error={errors.lastName}>
                <input
                    {...register("lastName")}
                    type="lastName"
                    className={`auth-input ${errors.lastName ? "border-red-500"
                        : "border-gray-200"
                        }`}
                    name="lastName"
                    id="lastName"
                />
            </Field>
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
            <button
                className="mt-3 auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    )
}
