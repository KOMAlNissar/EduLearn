export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !value) {
      errors[field] = 'This field is required';
    } else if (value) {
      if (fieldRules.email && !validateEmail(value)) {
        errors[field] = 'Invalid email address';
      }
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      }
    }
  });
  
  return errors;
};