// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SchoolRegistration {

    address public owner;
    uint public courseCount = 0;
    uint public studentCount = 0;

    struct Student {
        string name;
        uint[] enrolledCourses;
    }

    struct Course {
        string name;
        address instructor;
    }

    mapping(address => Student) public students;
    mapping(uint => Course) public courses;
    mapping(address => mapping(uint => bool)) public attendance;

    event StudentRegistered(address indexed studentAddress, string name);
    event CourseAdded(uint indexed courseId, string courseName, address indexed instructor);
    event EnrolledInCourse(address indexed studentAddress, uint indexed courseId);
    event AttendanceMarked(address indexed studentAddress, uint indexed courseId, bool present);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyStudent() {
        require(bytes(students[msg.sender].name).length > 0, "Not a registered student");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

   
    function registerStudent(address _student, string memory _name) public onlyOwner {
        require(bytes(students[_student].name).length == 0, "Student already registered");
        students;
        studentCount++;
        emit StudentRegistered(_student, _name);
    }

   
    function selfRegister(string memory _name) public {
        require(bytes(students[msg.sender].name).length == 0, "Already registered as student");
        students;
        studentCount++;
        emit StudentRegistered(msg.sender, _name);
    }

   
    function addCourse(string memory _courseName, address _instructor) public onlyOwner {
        courses[courseCount] = Course(_courseName, _instructor);
        emit CourseAdded(courseCount, _courseName, _instructor);
        courseCount++;
    }

   
    function enrollInCourse(uint _courseId) public onlyStudent {
        require(_courseId < courseCount, "Invalid course ID");
        students[msg.sender].enrolledCourses.push(_courseId);
        emit EnrolledInCourse(msg.sender, _courseId);
    }

   
    function markAttendance(uint _courseId, bool _present) public onlyStudent {
        require(_courseId < courseCount, "Invalid course ID");
        attendance[msg.sender][_courseId] = _present;
        emit AttendanceMarked(msg.sender, _courseId, _present);
    }

    
    function getAttendance(uint _courseId, address _student) public view returns (bool) {
        return attendance[_student][_courseId];
    }

   
    function getStudent(address _student) public view returns (string memory name, uint[] memory enrolledCourses) {
        Student memory s = students[_student];
        return (s.name, s.enrolledCourses);
    }

   
    function getCourse(uint _courseId) public view returns (string memory courseName, address instructor) {
        require(_courseId < courseCount, "Invalid course ID");
        Course memory c = courses[_courseId];
        return (c.name, c.instructor);
    }
}
