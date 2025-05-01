import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../../config/jwt";
import { User } from "../models/User";
import { validateEmail } from "../validations/validateEmail";
import { validatePassword } from "../validations/validatePassword";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validate email and password
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return res.status(400).json({
      success: false,
      errors: emailValidation.errors,
    });
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({
      success: false,
      errors: passwordValidation.errors,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: ["User already exists"],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    const token = signToken({ userId: user._id });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
