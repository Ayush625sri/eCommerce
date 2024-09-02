import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv"

dotenv.config()
import { transporter } from "./sendEmail.js";

var gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
	try {
		const { name, slug, description, category, price, quantity, shipping } =
			req.fields;
		const { photo } = req.files;
		//Validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is required" });
			case !description:
				return res
					.status(500)
					.send({ error: "Description is required" });
			case !category:
				return res.status(500).send({ error: "Category is required" });
			case !price:
				return res.status(500).send({ error: "Price is required" });
			case !quantity:
				return res.status(500).send({ error: "Quantity is required" });
			case photo && photo.size > 1000000:
				return res.status(500).send({
					error: "Photo is required and should be less thant 1 MB",
				});
		}
		const product = new productModel({
			...req.fields,
			slug: slugify(name).toLowerCase(),
		});
		if (photo) {
			product.photo.data = fs.readFileSync(photo.path);
			product.photo.contentType = photo.type;
		}
		await product.save();
		res.status(201).send({
			success: true,
			message: "Product Created Successfully",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error in Creating Product",
		});
	}
};
export const getProductController = async (req, res) => {
	try {
		const products = await productModel
			.find({})
			.select("-photo")
			.populate("category")
			.limit(12)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			message: "All Products",
			total: products.length,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting product",
			error: error.message,
		});
	}
};
export const getSingleProductController = async (req, res) => {
	try {
		const product = await productModel
			.findById(req.params.pid)
			.select("-photo")
			.populate("category");
		if (!product) {
			return res.status(404).send({
				success: false,
				message: "Product Not found",
			});
		}
		res.status(200).send({
			success: true,
			message: "Single Product Fetched",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting single product",
			error: error.message,
		});
	}
};
export const productPhotoController = async (req, res) => {
	try {
		const product = await productModel
			.findById(req.params.pid)
			.select("photo");
		if (product.photo.data) {
			res.set("Content-Type", product.photo.contentType);
			return res.status(200).send(product.photo.data);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting product photo",
			error: error.message,
		});
	}
};
export const updateProductController = async (req, res) => {
	try {
		const { name, description, category, price, quantity } = req.fields;
		const { photo } = req.files;
		//Validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is required" });
			case !description:
				return res
					.status(500)
					.send({ error: "Description is required" });
			case !category:
				return res.status(500).send({ error: "Category is required" });
			case !price:
				return res.status(500).send({ error: "Price is required" });
			case !quantity:
				return res.status(500).send({ error: "Quantity is required" });
			case photo && photo.size > 1000000:
				return res.status(500).send({
					error: "Photo is required and should be less thant 1 MB",
				});
		}
		const product = await productModel.findByIdAndUpdate(
			req.params.pid,
			{ ...req.fields, slug: slugify(name) },
			{ new: true }
		);
		if (photo) {
			product.photo.data = fs.readFileSync(photo.path);
			product.photo.contentType = photo.type;
		}
		await product.save();
		res.status(201).send({
			success: true,
			message: "Product Updated Successfully",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in updating product ",
			error: error.message,
		});
	}
};
export const deleteProductController = async (req, res) => {
	try {
		const { pid } = req.params;
		const product = await productModel
			.findById(req.params.pid)
			.select("photo");
		if (!product) {
			return res.status(404).send({
				success: false,
				message: "Product not Found ",
			});
		}
		await productModel.findByIdAndDelete(pid);
		res.status(200).send({
			success: true,
			message: "Product Deleted Successfully ",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in deleting product ",
			error: error.message,
		});
	}
};
export const productFilterController = async (req, res) => {
	try {
		const { checked, radio } = req.body;

		let args = {};
		if (checked.length > 0) args.category = checked;
		if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
		const products = await productModel.find(args);
		console.log(args);
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Filtering Products",
			error: error.message,
		});
	}
};
export const productCountController = async (req, res) => {
	try {
		let total = await productModel.find({}).count();
		// const total = await productModel.find({}).estimatedDocumentCount();
		res.status(200).send({
			success: true,
			total,
		});
	} catch (error) {
		console.log(error.message);
		res.status(400).send({
			success: false,
			message: "Error in Count Products",
			error,
		});
	}
};
export const productListController = async (req, res) => {
	try {
		const perPage = 8;
		const page = req.params.page ? req.params.page : 1;
		const products = await productModel
			.find({})
			.select("-photo")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error in per page control",
			error,
		});
	}
};
export const searchProductController = async (req, res) => {
	try {
		const { keyword } = req.params;

		const results = await productModel
			.find({
				$or: [
					{ name: { $regex: keyword, $options: "i" } },
					{ description: { $regex: keyword, $options: "i" } },
				],
			})
			.select("-photo");
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error in search product api",
			error,
		});
	}
};
export const relatedProductController = async (req, res) => {
	try {
		const { pid, cid } = req.params;

		const products = await productModel
			.find({
				category: cid,
				_id: { $ne: pid },
			})
			.select("-photo")
			.limit(4)
			.populate("category");
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error in related product ",
			error,
		});
	}
};
export const productCategoryController = async (req, res) => {
	try {
		const category = await categoryModel.findOne({ slug: req.params.slug });
		const products = await productModel
			.find({ category })
			.populate("category");
		res.status(200).send({
			success: true,
			message: "Single category accessed",
			products,
			category,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error while getting category wise products",
			error,
		});
	}
};
export const braintreeTokenController = async (req, res) => {
	try {
		gateway.clientToken.generate({}, function (err, response) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(response);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const braintreePaymentsController = async (req, res) => {
	try {
		const { cart, nonce } = req.body;
		let total = 0;
		cart.map((i) => {
			total += i.price;
		});
		let newTransaction = gateway.transaction.sale(
			{
				amount: total,
				paymentMethodNonce: nonce,
				options: {
					submitForSettlement: true,
				},
			},
			function (error, result) {
				if (result) {
					const order = new orderModel({
						products: cart,
						payment: result,
						buyer: req.user._id,
					}).save();
					res.json({ ok: true });
				} else {
					res.status(500).send(error);
				}
			}
		);

		
		const sendEmail = async()=>{
			try {
				const mailOptions = {
					from: {
						name: "Vault24",
						address: process.env.SMTP_MAIL,
					},
					to: "alexshaun77@gmail.com",
					subject:"Order Placed Vault24",
					html:"<div> Thankyou For Makeing Your First Purchase order... on <strong>Vault24</strong></div>",
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
	} catch (error) {
		console.log(error);
	}
};
