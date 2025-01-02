import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/errorHandler.js';

export const getCourses = async (filters = {}) => {
  return Course.find(filters)
    .populate('instructor', 'name')
    .select('-reviews');
};

export const updateCourseProgress = async (userId, courseId, lessonId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const courseEnrollment = user.enrolledCourses.find(
    course => course.courseId.toString() === courseId
  );

  if (!courseEnrollment) {
    throw new AppError('Not enrolled in this course', 403);
  }

  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      'enrolledCourses.$[course].completedLessons': lessonId,
    },
  }, {
    arrayFilters: [{ 'course.courseId': courseId }],
  });

  return { message: 'Progress updated successfully' };
};