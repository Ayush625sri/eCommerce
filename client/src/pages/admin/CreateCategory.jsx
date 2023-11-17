import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Button } from "antd";
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";

import CategoryForm from "../../components/Form/CategoryForm";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";
const CreateCategory = () => {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(null);
	const [updatedName, setUpdatedName] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [delteSelected, setDelteSelected] = useState(null);
	const [deletedName, setDeletedName] = useState("");

	const getAllCategory = async () => {
		try {
			const { data } = await axios.get(`/api/v1/category/get-categories`);
			if (data?.success) {
				setCategories(data?.categories);
			}
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong in getting category`);
		}
	};
	useEffect(() => {
		getAllCategory();
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`/api/v1/category/update-category/${selected._id}`,
				{ name: updatedName }
			);
			if (data.success) {
				toast.success(`${updatedName} Updated`);
				setSelected(null);
				setUpdatedName("");
				setVisible(false);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Some Error Occurred");
		}
	};
	const handleDelete = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.delete(
				`/api/v1/category/delete-category/${delteSelected._id}`
			);
			if (data.success) {
				toast.success(`${deletedName} Deleted`);
				setDeleteConfirm(false)
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Some Error Occurred");
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`/api/v1/category/create-category`,
				{ name }
			);
			if (data?.success) {
				toast.success(`${name} is created`);
				setName("")
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong in input `);
		}
	};
	return (
		<Layout title={"Dashboard - Create Category"}>
			<div className="flex flex-col xl:flex-row mb-8 pt-12 lg:pt-28">
				<AdminMenu />
				<div className="flex flex-col xl:w-full mt-6 p-2 md:mx-10 md:p-10 pt-4 h-fit  border-2 shadow-gray-400 shadow-xl ">
					<div className="flex flex-col lg:flex-row items-center justify-around">	
						<h1 className="text-4xl md:text-5xl bold">Manage Category</h1>
						<div className="">
							<CategoryForm
								handleSubmit={handleSubmit}
								value={name}
								setValue={setName}
								color="gray"
							/>
						</div>
					</div>
					<div className="mt-6 shadow-gray-400 shadow-lg 	">
						<table className="text-2xl border-2  w-full ">
							<thead className=" text-xl md:text-3xl">
								<tr className="border-2">
									<th
										className="border-2  px-1 md:px-4 lg:px-16 py-2"
										scope="col"
									>
										Name
									</th>
									<th
										className="border-b-2 px-1 md:px-8 lg:px-32 py-2"
										scope="col"
									>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="lg:px-4  text-center w-">
								{categories?.map((c) => (
									<tr
										className="border-b-2 text-xl md:text-[1.6rem] "
										key={c._id}
									>
										<td className="border-r-2  lg:px-6">
											{c.name.charAt(0).toUpperCase() +
												c.name.slice(1)}
										</td>
										<td className="flex flex-col lg:flex-row items-center justify-around py-1 lg:py-2 border-x-1 ">
											<button
												onClick={() => {
													setVisible(true);
													setUpdatedName(c.name);
													setSelected(c);
												}}
												className="active:scale-95 shadow-gray-800 shadow-md border-4 border-green-700  px-2 md:px-5 py-2 my-2 rounded-xl bg-green-700 text-white hover:bg-white hover:text-green-700 flex items-center gap-4"
											>
												{(screen.width > 500) && "Edit" }<BsPencilSquare />{" "}
											</button>
											<button
												onClick={() => {
													setDeleteConfirm(true)
													setDeletedName(c.name);
													setDelteSelected(c)
												}}
												className="active:scale-95 shadow-gray-800 shadow-md border-4 border-red-700  bg- px-2 py-2 my-2 rounded-xl bg-red-700  text-white hover:bg-white hover:text-red-700  flex items-center gap-4"
											>
												{(screen.width > 500) && "Delete" } <BsFillTrash3Fill />{" "}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<Modal
							title="Edit Category"
							open={visible}
							onOk={() => setVisible(false)}
							onCancel={() => setVisible(false)}
							footer={null}
						>
							<CategoryForm
								value={updatedName}
								setValue={setUpdatedName}
								handleSubmit={handleUpdate}
								message={"Edit"}
								color={"green"}
							/>
						</Modal>
					</div>
						<Modal
							title="Delete Category"
							open={deleteConfirm}
							onOk={() => setDeleteConfirm(false)}
							onCancel={() => setDeleteConfirm(false)}
							footer={null}
						>
							<CategoryForm
								value={deletedName}
								setValue={setDeletedName}
								handleSubmit={handleDelete}
								message={"Delete"}
								color={'red'}
								input={false}
								altMessage={"Are You Sure ? "}
							/>
						</Modal>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCategory;
