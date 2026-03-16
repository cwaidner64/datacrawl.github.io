import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = form.subject?.trim() || "Contact Form Submission";
    const body = [
      `Name: ${form.name || ""}`,
      `Email: ${form.email || ""}`,
      "",
      form.message || "",
    ].join("\n");

    const mailtoUrl = `mailto:contact@datacrawl.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center font-[Heebo] px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
      <h6 className="text-lg text-gray-400 mb-6">
        Please fill out the form below and we will get back to you as soon as possible.
      </h6>
      <p className="text-sm text-gray-400 mb-6">
        Direct email: <a href="mailto:contact@datacrawl.org" className="text-blue-400 hover:underline">contact@datacrawl.org</a>
      </p>
      {/* Contact Form */}
      <div className="bg-[#181818] rounded-xl shadow-lg p-8 w-full max-w-xl border border-gray-800">
        {submitted ? (
          <div className="text-center text-blue-400 text-xl font-semibold py-12">
            Thank you for reaching out!<br />We will get back to you soon.
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-2 font-semibold" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-semibold" htmlFor="email">
                Your Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-semibold" htmlFor="subject">
                Subject
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />

              </div>
            <div>
              <label className="block text-gray-300 mb-2 font-semibold" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[120px]"
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition mt-2"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}