import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";

actor {
	stable var counter : Nat = 0;

	type Grade = {
		#A;
		#B;
		#C;
		#D;
		#F;
	};

	type Student = {
		id : Nat;
		name : Text;
		grade : Grade;
		lastUpdated : Int;
	};

	// Stable storage for students
	stable var students : [Student] = [];
	stable var nextStudentId : Nat = 1;

	public func increment() : async Nat {
		counter += 1;
		return counter;
	};

	public query func getCount() : async Nat {
		return counter;
	};

	public func greetWithYearOfBirth(name : Text, yearOfBirth : Nat) : async Text {
		return "Hello, " # name # "! The current year of birth is " # Nat.toText(yearOfBirth) # ".";
	};

	public func addStudent(name : Text, grade : Grade) : async Student {
		let student : Student = {
			id = nextStudentId;
			name = name;
			grade = grade;
			lastUpdated = Time.now();
		};
		students := Array.append(students, [student]);
		nextStudentId += 1;
		return student;
	};

	public func updateGrade(studentId : Nat, newGrade : Grade) : async ?Student {
		var updatedStudent : ?Student = null;
		var newStudents : [Student] = [];

		for (student in students.vals()) {
			if (student.id == studentId) {
				let updated = {
					student with
					grade = newGrade;
					lastUpdated = Time.now();
				};
				updatedStudent := ?updated;
				newStudents := Array.append(newStudents, [updated]);
			} else {
				newStudents := Array.append(newStudents, [student]);
			};
		};

		students := newStudents;
		return updatedStudent;
	};

	public query func getStudent(studentId : Nat) : async ?Student {
		for (student in students.vals()) {
			if (student.id == studentId) {
				return ?student;
			};
		};
		return null;
	};

	public query func getStudentsByGrade(grade : Grade) : async [Student] {
		let filtered = Array.filter(
			students,
			func(student : Student) : Bool {
				student.grade == grade;
			},
		);
		return filtered;
	};
};
