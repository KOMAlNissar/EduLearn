import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">EduLearn</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900">
              Courses
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <User className="h-6 w-6 text-gray-700" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}