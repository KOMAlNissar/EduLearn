import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';

interface EnrollButtonProps {
  courseId: string;
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { enrollInCourse, isEnrolled } = useCourseStore();
  
  const enrolled = user ? isEnrolled(user.id, courseId) : false;

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!enrolled) {
      enrollInCourse(user.id, courseId);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className={`px-4 py-2 rounded-md ${
        enrolled
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white transition-colors`}
      disabled={enrolled}
    >
      {enrolled ? 'Enrolled' : 'Enroll Now'}
    </button>
  );
}