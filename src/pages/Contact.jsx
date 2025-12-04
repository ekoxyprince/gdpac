import React from "react";
import displayImg from "../assets/Display.png";

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white flex items-center justify-center px-4 py-10">
    <div className="sr-section max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
      <div className="space-y-5">
        <p className="text-xs tracking-[0.25em] uppercase text-green-300">
          Contact
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Lets collaborate on better data and better governance.
        </h1>
        <p className="text-sm text-blue-100">
          Reach out to explore partnerships, request demos, or access detailed
          analytics for your state or institution.
        </p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Email:</span> info@gdpac.ng
          </div>
          <div>
            <span className="font-semibold">Address:</span> Abuja, Nigeria
          </div>
        </div>
        <img
          src={displayImg}
          alt="Contact GDPAC illustration"
          className="rounded-2xl shadow-lg object-cover w-full max-w-xs border border-white/20"
        />
      </div>

      <form className="bg-white rounded-2xl p-6 text-blue-900 shadow-md space-y-4 transition-transform duration-300 hover:-translate-y-1">
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-blue-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. Dr. Ada Obi"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-blue-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.org"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">
            Organisation / State
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-blue-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. Kaduna State Planning Commission"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">
            How can we help?
          </label>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-blue-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            placeholder="Share a short description of your request, project, or idea."
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:from-blue-700 hover:to-green-500 transition-colors"
        >
          Send message (demo)
        </button>
        <p className="text-[0.7rem] text-blue-500 mt-1">
          This is a demo form. Hook it to your preferred backend or email service
          when ready.
        </p>
      </form>
    </div>
  </div>
);

export default Contact;
