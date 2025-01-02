import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../types';

interface CourseState {
  courses: Course[];
  enrolledCourses: Record<string, string[]>; // userId -> courseIds
  enrollInCourse: (userId: string, courseId: string) => void;
  isEnrolled: (userId: string, courseId: string) => boolean;
}

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch with modern technologies.',
    instructor: 'John Doe',
    lessons: 12,
    students: 1200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning',
    description: 'Master machine learning algorithms and neural networks.',
    instructor: 'Jane Smith',
    lessons: 15,
    students: 1200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb'
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps with React Native.',
    instructor: 'Mike Johnson',
    lessons: 10,
    students: 1200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
  }
];

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: initialCourses,
      enrolledCourses: {},
      enrollInCourse: (userId: string, courseId: string) => {
        set((state) => {
          const userEnrollments = state.enrolledCourses[userId] || [];
          if (userEnrollments.includes(courseId)) {
            return state;
          }
          return {
            enrolledCourses: {
              ...state.enrolledCourses,
              [userId]: [...userEnrollments, courseId],
            },
            courses: state.courses.map(course =>
              course.id === courseId
                ? { ...course, students: course.students + 1 }
                : course
            ),
          };
        });
      },
      isEnrolled: (userId: string, courseId: string) => {
        const userEnrollments = get().enrolledCourses[userId] || [];
        return userEnrollments.includes(courseId);
      },
    }),
    {
      name: 'course-storage',
    }
  )
);