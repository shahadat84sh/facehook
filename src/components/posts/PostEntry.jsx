import { useForm } from "react-hook-form"
import { actions } from "../../actions/Index"
import AddPhoto from "../../assets/icons/addPhoto.svg"
import { useAuth } from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"
import { usePost } from "../../hooks/usePost"
import useProfile from "../../hooks/useProfile"
import Field from "../Common/Field"


export const PostEntry = ({ onCreate }) => {
    const { auth } = useAuth()
    const { dispatch } = usePost()
    const { api } = useAxios();
    const { state: profile } = useProfile()
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const user = profile?.user ?? auth?.user;
    const handlePostSubmit = async (formData) => {
        console.log(formData);
        dispatch({ type: actions.post.DATA_FETCHING })
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`, formData);
            if (response.status === 200) {
                dispatch({ type: actions.post.POST_CREATED, data: response.data })

                onCreate()
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error })
        }
    }

    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                Create Post
            </h6>
            <button className="absolute right-3 top-3 transition-all hover:opacity-80 active:scale-95 active:opacity-70">
                <img src="./assets/icons/close.svg" alt="close" />
            </button>

            <form onSubmit={handleSubmit(handlePostSubmit)}>
                <div
                    className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4"
                >
                    <div className="flex items-center gap-3">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_URL}/${user?.avatar}`}
                            alt="avatar"
                        />
                        <div>
                            <h6 className="text-lg lg:text-xl">{user?.firstName} {" "} {user?.lastName} </h6>
                            <span className="text-sm text-gray-400 lg:text-base">Public</span>
                        </div>
                    </div>

                    <label
                        className="btn-primary cursor-pointer !text-gray-100"
                        htmlFor="photo"
                    >
                        <img src={AddPhoto} alt="Add Photo" />
                        Add Photo
                    </label>
                    <input type="file" name="photo" id="photo" className="hidden" />
                </div>
                {/* <!-- Post Text Input --> */}

                <Field>
                    <textarea
                        {...register("content", { required: "adding some text is mandatory" })}
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:mb-6 lg:h-[160px]"
                    >
                        BIO
                    </textarea>
                </Field>

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit"
                    >
                        Post
                    </button>
                </div>
                {/* <!-- Image --> */}
                {/* <div
                    className="mx-auto mb-4 flex max-w-[90%] items-center justify-center lg:mb-6"
                >
                    <div className="relative">
                        <img
                            className="max-w-full"
                            src="./assets/images/poster.png"
                            alt="image"
                        />
                        <button className="absolute right-2 top-2 transition-all hover:opacity-80 active:scale-95 active:opacity-70">
                            <img src="./assets/icons/close.svg" alt="close" />
                        </button>
                    </div>
                </div> */}

            </form>
        </div>
    )
}
