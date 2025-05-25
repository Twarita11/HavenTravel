// src/components/Register.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [trustedContact, setTrustedContact] = useState('');
  const [activities, setActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Added error message state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then((response) => {
      setAvailableActivities(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); //reset error message.
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        phone,
        city,
        trustedContact,
        activities,
      });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred.');
      console.error(error);
    }
  };

  const toggleActivity = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter((a) => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
          City
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trustedContact">
          Trusted Contact
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="trustedContact"
          type="text"
          placeholder="Trusted Contact"
          value={trustedContact}
          onChange={(e) => setTrustedContact(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Activities</label>
        <div className="flex flex-wrap">
          {availableActivities.map((activity) => (
            <button
              key={activity}
              type="button"
              onClick={() => toggleActivity(activity)}
              className={`m-1 p-2 border rounded ${
                activities.includes(activity) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        <Link
          to="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Login
        </Link>
      </div>
    </form>
  );
}

export default Register;