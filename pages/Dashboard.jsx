import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';

export function Dashboard() {
  const { user } = useAuthStore();
  const { courses, enrolledCourses } = useCourseStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userEnrollments = enrolledCourses[user.id] || [];
  const enrolledCourseDetails = courses.filter(course => 
    userEnrollments.includes(course.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      {enrolledCourseDetails.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">My Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourseDetails.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.lessons} lessons</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  );
}