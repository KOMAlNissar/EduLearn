import express from 'express';
import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createPaymentIntent } from '../services/stripe.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate('instructor', 'name')
    .select('-reviews');
  res.json(courses);
}));

router.post('/enroll', auth, asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  // Create payment intent
  const paymentIntent = await createPaymentIntent({
    amount: course.price * 100, // Convert to cents
    currency: 'usd',
  });

  res.json({ clientSecret: paymentIntent.client_secret });
}));

router.post('/progress', auth, asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.body;
  const userId = req.user.id;

  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      'enrolledCourses.$[course].completedLessons': lessonId,
    },
  }, {
    arrayFilters: [{ 'course.courseId': courseId }],
  });

  res.json({ message: 'Progress updated' });
}));

export default router;