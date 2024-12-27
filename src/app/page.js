"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
export default function Home() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Correcte regex
        if (!emailPattern.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        try {
            const address = await axios.get("http://localhost:1338/api/emails");
            address.data.data.forEach((data) => {
                if (data.address === email) {
                    throw new Error("Email is already taken");
                }
            });

            const response = await axios.post("http://localhost:1338/api/emails", {
                data: { address: email },
            });

            console.log(response);

            if (response.status == 200 || response.status == 201) {
                setMessage("51.057005, 3.727803");
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            {/* Background video */}
            <video className="absolute top-0 left-0 w-full h-full object-cover " src="./video/video.mp4" autoPlay loop muted></video>

            {/* Overlay for tint */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            {/* Content */}
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-black p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-extrabold text-white mb-4 text-center">Locatie STFP</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-lg" style={{ color: message.includes("51.057005, 3.727803") ? "#00ff00" : "#ff4444" }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
