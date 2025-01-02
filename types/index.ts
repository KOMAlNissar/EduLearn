export interface User {
  id: string;
  email: string;
  name: string;
  enrolledCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  lessons: number;
  students: number;
  rating: number;
  image: string;
}