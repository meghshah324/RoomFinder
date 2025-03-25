import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/roommate-hero.jpg"; // Add your own hero image

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-white shadow-sm">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Roommate
          </h1>
          <p className="text-gray-600 mb-6">
            Discover rooms, connect with verified users, and live with people who match your lifestyle.
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-green-400 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
          >
            Browse Rooms
          </Link>
        </div>
        <div className="md:w-1/2">
          <img src={heroImg} alt="Roommates" className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Verified Listings",
              desc: "Every listing is manually reviewed to ensure safety and accuracy.",
              emoji: "✅",
            },
            {
              title: "Chat with Roommates",
              desc: "Connect with potential roommates and discuss before finalizing.",
              emoji: "💬",
            },
            {
              title: "Lifestyle Match",
              desc: "See preferences like cleanliness, food habits, and guest policy.",
              emoji: "🧘‍♂️",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-400 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Roommate?</h2>
        <p className="mb-6">Sign in, list your room or browse existing ones now.</p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
