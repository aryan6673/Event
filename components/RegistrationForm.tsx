
import React, { useState } from 'react';

export function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, company });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400">Thank You!</h2>
        <p className="text-gray-300 mt-2">You're registered for the event. We've sent a confirmation to {email}.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl">
      <h2 className="text-2xl font-bold text-center text-white">Register for the Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 text-left">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-md text-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-md text-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="ada@example.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 text-left">
            Company (Optional)
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-md text-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Stark Industries"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-black transition-all duration-300 transform hover:scale-105"
        >
          Secure My Spot
        </button>
      </form>
    </div>
  );
}
