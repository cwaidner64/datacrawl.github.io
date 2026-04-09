import React, { useState } from "react";
import Header from "../Components/Landing/Header";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <div className="min-h-screen bg-[#111111] text-white py-12 sm:py-20 px-4 font-[Heebo]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <section className="flex flex-col items-center text-center mb-10 sm:mb-16 mt-6 sm:mt-10">
          <Header
            label="Contact"
            title="Get in Touch"
            subtext="Fill out the form below and we'll get back to you as soon as possible."
          />
          <p className="text-[#aaa] mt-6 text-sm">
            Direct email:{" "}
            <a href="mailto:contact@datacrawl.org" className="text-blue-400 font-semibold hover:underline">
              contact@datacrawl.org
            </a>
          </p>
        </section>

        {/* Contact Form */}
        <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 sm:p-10 w-full max-w-xl">
          {submitted ? (
            <div className="flex flex-col gap-6">
              <div className="text-center text-blue-400 text-xl font-semibold">
                Thank you for reaching out!
              </div>
              <p className="text-[#aaa] text-sm text-center">
                Make sure your email client opened with the message ready to send. If not, copy the message below and email us directly at{" "}
                <a href="mailto:contact@datacrawl.org" className="text-blue-400 hover:underline">contact@datacrawl.org</a>
              </p>
              <div className="bg-[#2a2a2a] border border-[#444] rounded-lg p-4 text-sm text-[#d1d5db] whitespace-pre-wrap font-mono">
                {`To: contact@datacrawl.org\nSubject: ${form.subject}\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `To: contact@datacrawl.org\nSubject: ${form.subject}\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                  ).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
                }}
                className="bg-[#333] hover:bg-[#444] text-white px-6 py-2 rounded-lg font-semibold transition text-sm"
              >
                {copied ? "Copied!" : "Copy Message"}
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#d1d5db] mb-2 font-semibold" htmlFor="name">Name</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#d1d5db] mb-2 font-semibold" htmlFor="email">Your Email</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#d1d5db] mb-2 font-semibold" htmlFor="subject">Subject</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#d1d5db] mb-2 font-semibold" htmlFor="message">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[120px]"
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
    </div>
  );
}