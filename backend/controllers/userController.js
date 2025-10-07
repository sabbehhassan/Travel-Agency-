// controllers/userController.js
import { supabase } from "../supabaseClient.js";
import { serverErr } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const getMe = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, phone, cnic, avatar, role, created_at")
      .eq("id", req.userId)
      .single();

    if (error || !data)
      return res.status(404).json({ message: "User not found" });

    res.json(data);
  } catch (err) {
    return serverErr(res, err);
  }
};

export const updateProfile = async (req, res) => {
  const { name, email, phone, cnic } = req.body;
  let avatarUrl = null;

  try {
    if (req.file) {
      const fileName = `avatars/${req.userId}_${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      avatarUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("RegisterDetails")
      .update({
        name,
        email,
        phone,
        cnic,
        ...(avatarUrl && { avatar: avatarUrl }),
      })
      .eq("id", req.userId)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "✅ Profile updated successfully", user: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const { data: user } = await supabase
      .from("RegisterDetails")
      .select("password")
      .eq("id", req.userId)
      .single();

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await supabase
      .from("RegisterDetails")
      .update({ password: hashedPassword })
      .eq("id", req.userId);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    return serverErr(res, err);
  }
};
