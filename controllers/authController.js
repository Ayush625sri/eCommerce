import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePass, hashPassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken";
import { transporter } from "./sendEmail.js";
import { config } from "dotenv";
config()


//POST || REGISTER
export const registerController = async (req, res) => {
	try {
		const { name, email, password, phone, address, question } = req.body;

		if (!name || !email || !password || !phone || !address || !question) {
			return res.send({ message: "All the entries are required" });
		}
		const existingUser = await userModel.findOne({ email });
		//check if user exist
		if (existingUser) {
			return res.status(200).send({
				success: false,
				message: "Already Registered Please Login",
			});
		}
		//Register User
		const hashedPassword = await hashPassword(password);
		const user = await new userModel({
			name,
			email,
			phone,
			address,
			question,
			password: hashedPassword,
		}).save();

		
		const sendEmail = async()=>{
			try {
				const mailOptions = {
					from: {
						name: "Vault24",
						address: process.env.SMTP_MAIL,
					},
					to: email,
					subject:"Vault24",
					html:"<div> Thankyou For registering on <strong>Vault24</strong></div>",
				}
				
				console.log(mailOptions)
				console.log("Sending Email...")
				
				transporter.sendMail(mailOptions, (err, info)=>{
					if(err){
						console.log("Sent Email failed")
						console.log(err.message)
					}
					else{
						console.log('Email Sent Successfully')
					}
				})
				
			} catch (error) {;
				console.log("Error in sendEmail")
				console.log(error)
				
			}
		}
		sendEmail()


		res.status(201).send({
			success: true,
			message: "User Registered Successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: `Error in Registration`,
			error,
		});
	}
};

//POST || Login
export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(404).send({
				success: false,
				message: "Invalid credentials",
			});
		}
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "Email is not registered",
			});
		}
		const match = await comparePass(password, user.password);
		if (!match) {
			return res.status(200).send({
				success: false,
				message: "Invalid Credentials",
			});
		}
		const token = await JWT.sign(
			{ _id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		
		
        
        const sendEmail = async()=>{
			try {
				const mailOptions = {
					from: {
						name: "Vault24",
						address: process.env.SMTP_MAIL,
					},
					to: email,
					subject:"Vault24",
					html:"<div> Thankyou For Loggin in on <strong>Vault24</strong></div>",
				}
				
				console.log(mailOptions)
				console.log("Sending Email...")
				
				transporter.sendMail(mailOptions, (err, info)=>{
					if(err){
						console.log("Sent Email failed")
						console.log(err.message)
					}
					else{
						console.log('Email Sent Successfully')
					}
				})
				
			} catch (error) {;
				console.log("Error in sendEmail")
				console.log(error)
				
			}
		}
		sendEmail()

		res.status(200).send({
			success: true,
			message: "Login Successfully",
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				address: user.address,
				role: user.role,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: `Error in login`,
			error,
		});
	}
};
export const forgotPasswordController = async (req, res) => {
	try {
		const { email, question, newPassword } = req.body;
		if (!email) {
			res.status(404).send({
				success: false,
				message: "Email is required",
			});
		}
		if (!question) {
			res.status(404).send({
				message: "Answer is required",
				success: false,
			});
		}
		if (!newPassword) {
			res.status(404).send({
				message: "New Password is required",
				success: false,
			});
		}
		const user = await userModel.findOne({ email, question });

		if (!user) {
			return res.status(404).send({
				success: false,
				message: "Wrong Email or Answer",
			});
		}
		const hashed = await hashPassword(newPassword);
		await userModel.findByIdAndUpdate(user._id, { password: hashed });
		await user.save();
		res.status(200).send({
			success: true,
			message: "Password Reset Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Something went wrong",
		});
	}
};

//test protected routre
export const testController = async (req, res) => {
	res.status(200).send({
		success: true,
		message: "Protected Route",
	});
};
export const updateProfileController = async (req, res) => {
	try {
		const { name, email, password, address, phone } = req.body;
		const user = await userModel.findById(req.user._id);

		if (password && password.length < 6) {
			return res.json({
				error: `Password is required and must be 6 character long`,
			});
		}

		const hashedPassword = password
			? await hashPassword(password)
			: undefined;
		const updatedUser = await userModel.findByIdAndUpdate(
			req.user._id,
			{
				name: name || user.name,
				password: hashedPassword || user.password,
				phone: phone || user.phone,
				address: address || user.address,
			},
			{ new: true }
		);

		const sendEmail = async()=>{
			try {
				const mailOptions = {
					from:  {
						name: "Telecom",
						address: process.env.SMTP_MAIL,
					},
					to: email,
					subject:"Profile Updated",
					html:"<div> Hi there, Your Vault24 profile has been updated.<strong>Vault24</strong></div>",
				}
				console.log(mailOptions)
				console.log("Sending Email...")
				
				transporter.sendMail(mailOptions, (err, info)=>{
					if(err){
						console.log("Sent Email failed")
						console.log(err.message)
					}
					else{
						console.log('Email Sent Successfully')
					}
				})
				
			} catch (error) {;
				console.log("Error in sendEmail")
				console.log(error)
				
			}
		}
		sendEmail()
		res.status(200).send({
			success: true,
			message: "Profile Updated",
			updatedUser,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: `Error while updating Profile`,
			error,
		});
	}
};

export const getOrdersController = async (req, res) => {
	try {
		const orders = await orderModel
			.find({ buyer: req.user._id })
			.populate("products", "-photo")
			.populate("buyer", "name");
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error while accessing my orders",
			error,
		});
	}
};

export const  getAllOrdersController = async (req, res) => {
	try {
		const orders = await orderModel
			.find({})
			.populate("products", "-photo")
			.populate("buyer", "name")
			.sort({ createdAt: "-1" });
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error while updating status of order",
			error,
		});
	}
};
export const orderStatusController = async (req, res) => {
	try {
		const {orderId} = req.params
		const {status} = req.body
		const order = await orderModel.findById(orderId)
		const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
		
		const buyer = await userModel.findById(order.buyer)
		console.log(buyer)
		
		const sendEmail = async()=>{
			try {
				const mailOptions = {
					from: {
						name: "Vault24",
						address: process.env.SMTP_MAIL,
					},
					to: buyer.email,
					subject:`Order ${status}`,
					html:"<div> Thankyou For Choosing Us Making Your Purchase... on <strong>Vault24</strong></div>",
				}
				
				console.log(mailOptions)
				console.log("Sending Email...")
				
				transporter.sendMail(mailOptions, (err, info)=>{
					if(err){
						console.log("Sent Email failed")
						console.log(err.message)
					}
					else{
						console.log('Email Sent Successfully')
					}
				})
				
			} catch (error) {;
				console.log("Error in sendEmail")
				console.log(error)
				
			}
		}
		sendEmail()
		res.json(orders)
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error while accessing my orders",
			error,
		});
	}
};
export const getAllUsersController = async (req, res) => {
	try {
		const users = await userModel.find({})
		res.status(200).send({success:true, message:"All Users Fetched", users})
	}catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while fetching all users",
			error,
		});
	}
};
