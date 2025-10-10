/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMsg(data.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg(data.message || "❌ Failed to send message");
      }
    } catch (error) {
      setResponseMsg("❌ Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Have any questions, suggestions, or project inquiries? <br />
              Fill out the form, and our team will get back to you within 24 hours.
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>
                📍 <strong>Office:</strong> Office # 4-6, Ibrahim Market, Khoamer
                Khomer, Gilgit, 15100
              </p>
              <p>📞 <strong>Phone:</strong> +92 300 1234567</p>
              <p>✉️ <strong>Email:</strong> info@siliconglobaltech.com</p>
              <p>🌐 <strong>Website:</strong> www.siliconglobaltech.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-gray-700"
            >
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {responseMsg && (
              <p className="text-center text-sm text-gray-700 mt-4">
                {responseMsg}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
