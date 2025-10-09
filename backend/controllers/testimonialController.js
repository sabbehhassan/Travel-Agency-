// controllers/testimonialController.js
import { supabase } from "../supabaseClient.js";

// 🟢 Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { user_id, rating, review } = req.body;

    if (!user_id || !rating || !review) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert new testimonial
    const { error } = await supabase
      .from("Testimonials")
      .insert([{ user_id, rating, review }]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return res.status(500).json({ message: "Failed to create testimonial" });
    }

    return res.status(201).json({ message: "✅ Testimonial submitted successfully" });
  } catch (error) {
    console.error("❌ Error creating testimonial:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get All Testimonials (with name & avatar)
export const getAllTestimonials = async (req, res) => {
  try {
    // Supabase supports `select()` with foreign table joins (if FK is defined)
    const { data, error } = await supabase
      .from("Testimonials")
      .select(`
        id,
        rating,
        review,
        created_at,
        RegisterDetails (
          name,
          avatar
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase fetch error:", error);
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
