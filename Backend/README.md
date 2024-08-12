# School Registration Smart Contract

This project implements a smart contract for managing school registration, course enrollment, and attendance tracking on the Ethereum blockchain. The smart contract is written in Solidity and uses the Web3.js library for interacting with the blockchain.

## Features

- **Student Registration**: Allows the contract owner to register students manually or students to self-register.
- **Course Management**: Enables the contract owner to add courses.
- **Course Enrollment**: Allows registered students to enroll in available courses.
- **Attendance Marking**: Registered students can mark their attendance for enrolled courses.
- **Data Retrieval**: Provides functions to retrieve student details, course details, and attendance records.

## Contract Details

### Contract Address

- **Owner**: The account that deploys the contract is set as the owner.
- **Public Variables**:
  - `owner`: The address of the contract owner.
  - `courseCount`: The total number of courses added.
  - `studentCount`: The total number of students registered.
  
### Structs

- **Student**: Contains a student's name and an array of enrolled course IDs.
- **Course**: Contains the course name and the instructor's address.

### Mappings

- `students`: Maps a student's address to their `Student` struct.
- `courses`: Maps a course ID to its `Course` struct.
- `attendance`: Maps a student's address and course ID to their attendance status.

### Events

- `StudentRegistered`: Triggered when a student is registered.
- `CourseAdded`: Triggered when a new course is added.
- `EnrolledInCourse`: Triggered when a student enrolls in a course.
- `AttendanceMarked`: Triggered when attendance is marked.

### Modifiers

- `onlyOwner`: Restricts access to contract owner functions.
- `onlyStudent`: Restricts access to registered students.

### Functions

- `registerStudent(address _student, string memory _name)`: Register a student (owner only).
- `selfRegister(string memory _name)`: Allows a user to self-register as a student.
- `addCourse(string memory _courseName, address _instructor)`: Add a new course (owner only).
- `enrollInCourse(uint _courseId)`: Enroll a student in a course (student only).
- `markAttendance(uint _courseId, bool _present)`: Mark attendance for a course (student only).
- `getAttendance(uint _courseId, address _student)`: Retrieve attendance for a student in a course.
- `getStudent(address _student)`: Get student details including enrolled courses.
- `getCourse(uint _courseId)`: Get course details including the instructor's address.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **MetaMask**: Install the MetaMask extension in your browser to interact with the contract.
- **Truffle or Hardhat**: (Optional) For deploying the contract on a local or test Ethereum network.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
