import React, { useState } from "react";
import Header from "../Components/Landing/Header";
import { usePageMeta } from "../utils/usePageMeta";

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description: "Get in touch with the DataCrawl team. Questions about webhook validation, pricing, or enterprise integrations — we respond within one business day.",
    canonical: "https://www.datacrawl.org/contact",
  });
  const [form, setForm] = useState({ name: "", company: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://hook.us2.make.com/5jpdk7qebo4irz6ip4u7hyjjyajvs4j3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      setSubmitted(true);
    } catch (submitErr) {
      console.error("Failed to send contact form:", submitErr);
      setError("Unable to send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                Message sent successfully!
              </div>
              <p className="text-[#aaa] text-sm text-center">
                Thank you for reaching out. We received your message and will get back to you soon.
              </p>
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
                <label className="block text-[#d1d5db] mb-2 font-semibold" htmlFor="company">Company Name</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="text"
                  id="company"
                  name="company"
                  value={form.company}
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
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}