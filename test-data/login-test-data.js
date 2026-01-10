// test-data/login-test-data.js
export const loginTestData = [
  {
    testId: 'TC001',
    testName: 'Valid Login',
    username: 'Admin',
    password: 'admin123',
    expectedResult: 'Dashboard should be displayed',
    shouldSucceed: true,
  },
  {
    testId: 'TC002',
    testName: 'Invalid Username',
    username: 'InvalidUser',
    password: 'admin123',
    expectedResult: 'Invalid credentials message should be displayed',
    shouldSucceed: false,
  },
  {
    testId: 'TC003',
    testName: 'Invalid Password',
    username: 'Admin',
    password: 'wrongpassword',
    expectedResult: 'Invalid credentials message should be displayed',
    shouldSucceed: false,
  },
  {
    testId: 'TC004',
    testName: 'Empty Username',
    username: '',
    password: 'admin123',
    expectedResult: 'Required field validation message should appear',
    shouldSucceed: false,
  },
  {
    testId: 'TC005',
    testName: 'Empty Password',
    username: 'Admin',
    password: '',
    expectedResult: 'Required field validation message should appear',
    shouldSucceed: false,
  },
  {
    testId: 'TC006',
    testName: 'Both Fields Empty',
    username: '',
    password: '',
    expectedResult: 'Required field validation messages should appear',
    shouldSucceed: false,
  },
  {
    testId: 'TC007',
    testName: 'Special Characters in Username',
    username: 'Admin@123#',
    password: 'admin123',
    expectedResult: 'Invalid credentials message should be displayed',
    shouldSucceed: false,
  },
  {
    testId: 'TC008',
    testName: 'Space in Username',
    username: ' Admin ',
    password: 'admin123',
    expectedResult: 'Invalid credentials message should be displayed',
    shouldSucceed: false,
  },
];

export default loginTestData;
