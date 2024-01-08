import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useCookies } from "react-cookie";


export function InovationLogin() {

    var navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(['userID']);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().required("User Name requried"),
            password: yup.string().required("Password requried")
        }),
        onSubmit: ((data) => {
            axios.get('https://dummyjson.com/users')
                .then(res => {

                    var details = res.data.users.find(item => item.username === data.username);
                    console.log(details);

                    if ((details.username === data.username && details.password === data.password)) {
                        setCookies("userID", data.username, [{ expires: new Date('2024-01-31') }]);
                        navigate("/products");
                    } else {
                        alert("invaild Credential");
                    }
                })
        })
    })

    return (
        <>
            <div className="bg-[#ffffff]">
                <div className="flex justify-center">
                    <div>
                        <div className="w-80 border border-black mt-16 rounded-lg">
                            <h3 className="bg-yellow-500 p-1 rounded-t-lg font-semibold">Login Form</h3>
                            <form className="p-2" onSubmit={formik.handleSubmit}>
                                <dl>
                                    <dt>User Name</dt>
                                    <dd><input onChange={formik.handleChange} name="username" className="border-2 w-full rounded-md p-1" type="text" /></dd>
                                    <dd className="text-red-500">{formik.errors.username}</dd>
                                    <dt>Password</dt>
                                    <dd><input onChange={formik.handleChange} name="password" className="border-2 w-full rounded-md p-1" type="password" /></dd>
                                    <dd className="text-red-500">{formik.errors.password}</dd>
                                </dl>
                                <button className="block text-white w-full rounded-lg p-2 mt-4 bg-[#007bff] " type="submit">Submit</button>
                            </form>
                        </div>
                        <span className="font-semibold text-lg">Haven't Account?&nbsp;</span><Link to="/register"><span className="font-semibold text-lg">Create.</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}