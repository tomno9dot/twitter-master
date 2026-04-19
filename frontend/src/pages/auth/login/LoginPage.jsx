import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast'


const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const queryClient = useQueryClient()

	const {mutate: loginMutation, isError, isPending, error} = useMutation({
		mutationFn: async ({username, password}) => {
			try {
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type" : "application/json"
					},
					body: JSON.stringify({username, password}),
				})

				const data = await res.json();

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}
				return data

			} catch (error) {
				throw new Error(error)
			}

		},

		onSuccess: () => {
			//refetch the authUser to update the ui
			queryClient.invalidateQueries({queryKey: ["authUser"]})
		}
	})
	





	

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='max-w-screen-2xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-black' />
			</div>
			<div className='flex-1 flex flex-col justify-center'>
				<div className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col'>
					<XSvg className='w-24 h-24  fill-black' />
					<h1 className='text-6xl lg:text-8xl font-extrabold text-black tracking-tighter'>Happening now</h1>
					<h2 className='text-3xl font-bold text-black mb-4'>Join today.</h2>
					<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-black'>{isPending ? "loading..." : "Login"}</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-black text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-black btn-outline w-full'>Sign up</button>
					</Link>
				</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;