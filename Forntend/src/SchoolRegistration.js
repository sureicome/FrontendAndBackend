import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SchoolRegistrationABI from "./SchoolRegistrationABI.json";

const contractABI = SchoolRegistrationABI;
const contractAddress = "0x4875642Ccc6449430e99650d8f67dDDb8b8F81C9";

const SchoolRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [courseId, setCourseId] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState(true);
  const [studentInfo, setStudentInfo] = useState('');
  const [courseInfo, setCourseInfo] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        if (!window.ethereum) {
          alert('MetaMask is required to use this dApp.');
          return;
        }

        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        setWeb3(web3);
        setContract(contract);

        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error initializing Web3:', error);
      }
    };

    init();
  }, []);

  const selfRegister = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }
    if (!studentName) {
      alert('Please enter a student name.');
      return;
    }
  
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.selfRegister(studentName).send({ from: accounts[0] });
      alert('Student registered successfully!');
    } catch (error) {
      if (error.message.includes('User denied transaction signature')) {
        alert('Transaction was rejected. Please approve the transaction in MetaMask.');
      } else {
        console.error('Error registering student:', error);
        alert('An error occurred while registering the student. Please check the console for details.');
      }
    }
  };
  

  const addCourse = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }
    if (!courseName || !instructor) {
      alert('Please enter course name and instructor address.');
      return;
    }
  
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.addCourse(courseName, instructor).send({ from: accounts[0] });
      alert('Course added successfully!');
    } catch (error) {
      if (error.message.includes('User denied transaction signature')) {
        alert('Transaction was rejected. Please approve the transaction in MetaMask.');
      } else {
        console.error('Error adding course:', error);
        alert('An error occurred while adding the course. Please check the console for details.');
      }
    }
  };

  const enrollInCourse = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }
    if (!courseId) {
      alert('Please enter a course ID.');
      return;
    }
  
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.enrollInCourse(courseId).send({ from: accounts[0] });
      alert('Enrolled in course successfully!');
    } catch (error) {
      if (error.message.includes('User denied transaction signature')) {
        alert('Transaction was rejected. Please approve the transaction in MetaMask.');
      } else {
        console.error('Error enrolling in course:', error);
        alert('An error occurred while enrolling in the course. Please check the console for details.');
      }
    }
  };

  const markAttendance = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }
    if (!courseId) {
      alert('Please enter a course ID.');
      return;
    }
  
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.markAttendance(courseId, attendanceStatus).send({ from: accounts[0] });
      alert('Attendance marked successfully!');
    } catch (error) {
      if (error.message.includes('User denied transaction signature')) {
        alert('Transaction was rejected. Please approve the transaction in MetaMask.');
      } else {
        console.error('Error marking attendance:', error);
        alert('An error occurred while marking attendance. Please check the console for details.');
      }
    }
  };
  

  const getStudent = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }

    try {
      const student = await contract.methods.getStudent(account).call();
      setStudentInfo(`Name: ${student[0]}, Enrolled Courses: ${student[1]}`);
    } catch (error) {
      console.error('Error fetching student info:', error);
      alert('An error occurred while fetching student info. Please check the console for details.');
    }
  };

  const getCourse = async () => {
    if (!contract) {
      alert('Contract is not initialized.');
      return;
    }
    if (!courseId) return;

    try {
      const course = await contract.methods.getCourse(courseId).call();
      setCourseInfo(`Course Name: ${course[0]}, Instructor: ${course[1]}`);
    } catch (error) {
      console.error('Error fetching course info:', error);
      alert('An error occurred while fetching course info. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>School Registration System</h1>
      <p>Account: {account}</p>

      <div>
        <h2>Register Student</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button onClick={selfRegister}>Self Register</button>
      </div>

      <div>
        <h2>Add Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructor Address"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <button onClick={addCourse}>Add Course</button>
      </div>

      <div>
        <h2>Enroll in Course</h2>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button onClick={enrollInCourse}>Enroll</button>
      </div>

      <div>
        <h2>Mark Attendance</h2>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <select
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value === 'true')}
        >
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>
        <button onClick={markAttendance}>Mark Attendance</button>
      </div>

      <div>
        <h2>Get Student Info</h2>
        <button onClick={getStudent}>Get Student</button>
        <pre>{studentInfo}</pre>
      </div>

      <div>
        <h2>Get Course Info</h2>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button onClick={getCourse}>Get Course</button>
        <pre>{courseInfo}</pre>
      </div>
    </div>
  );
};

export default SchoolRegistration;
