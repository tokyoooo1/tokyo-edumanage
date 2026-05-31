import { useState } from "react";
import Modal from "../../../components/modals/Modal";
import { useAuth } from "../../../hooks/useAuth";
import { calculateGrade } from "../../../utils/calculateGrades";
import { academicItems } from "../academicAPI";

const studentTimetable = [
  {
    day: "Monday",
    time: "8:30 AM",
    subject: "Mathematics",
    teacher: "Grace Williams",
  },
  {
    day: "Monday",
    time: "10:00 AM",
    subject: "English Language",
    teacher: "Samuel Adeyemi",
  },
  {
    day: "Tuesday",
    time: "9:15 AM",
    subject: "Biology",
    teacher: "Fatima Hassan",
  },
];

const studentGrades = [
  {
    subject: "Mathematics",
    score: "86%",
    grade: "A",
    feedback: "Strong problem-solving",
  },
  {
    subject: "English Language",
    score: "78%",
    grade: "B",
    feedback: "Improve essay structure",
  },
  {
    subject: "Biology",
    score: "82%",
    grade: "A",
    feedback: "Good practical notes",
  },
];

const studyMaterials = [
  { title: "Biology revision guide", subject: "Biology", type: "PDF" },
  {
    title: "Mathematics practice questions",
    subject: "Mathematics",
    type: "Worksheet",
  },
  { title: "English essay samples", subject: "English Language", type: "Link" },
];

const teacherClasses = [
  {
    className: "Grade 8 Blue",
    subject: "Mathematics",
    nextPeriod: "Today 8:30 AM",
    pendingGrades: 18,
  },
  {
    className: "Grade 7 Gold",
    subject: "Mathematics",
    nextPeriod: "Today 11:00 AM",
    pendingGrades: 12,
  },
  {
    className: "Grade 9 Blue",
    subject: "Biology",
    nextPeriod: "Tomorrow 9:15 AM",
    pendingGrades: 6,
  },
];

const initialGradebook = [
  {
    student: "Chinedu Okafor",
    subject: "Mathematics",
    score: "86%",
    grade: "A",
    status: "Submitted",
  },
  {
    student: "Maya Johnson",
    subject: "Mathematics",
    score: "78%",
    grade: "A",
    status: "Draft",
  },
  {
    student: "Tariq Bello",
    subject: "Biology",
    score: "82%",
    grade: "A",
    status: "Submitted",
  },
];

const initialClasses = [
  { name: "Grade 8", section: "Blue", academicYear: "2026/2027" },
  { name: "Grade 7", section: "Gold", academicYear: "2026/2027" },
];

const initialSubjects = [
  {
    className: "Grade 8 Blue",
    subject: "Mathematics",
    teacher: "Grace Williams",
  },
  {
    className: "Grade 7 Gold",
    subject: "English Language",
    teacher: "Samuel Adeyemi",
  },
];

const initialExams = [
  {
    title: "Midterm Mathematics",
    className: "Grade 8 Blue",
    date: "2026-06-12",
    room: "Hall A",
    status: "Scheduled",
  },
  {
    title: "Biology Practical",
    className: "Grade 9 Blue",
    date: "2026-06-14",
    room: "Lab 2",
    status: "Draft",
  },
];

const initialAssignments = [
  {
    title: "Algebra worksheet",
    className: "Grade 8 Blue",
    subject: "Mathematics",
    dueDate: "2026-06-07",
    status: "Open",
  },
  {
    title: "Essay outline",
    className: "Grade 7 Gold",
    subject: "English Language",
    dueDate: "2026-06-09",
    status: "Grading",
  },
];

export default function AcademicsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState(academicItems);
  const [classes, setClasses] = useState(initialClasses);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [gradebook, setGradebook] = useState(initialGradebook);
  const [materials, setMaterials] = useState(studyMaterials);
  const [exams, setExams] = useState(initialExams);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [gradingScale, setGradingScale] = useState("A-F Percentage");
  const [isCreatingTimetable, setIsCreatingTimetable] = useState(false);
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [isEnteringGrade, setIsEnteringGrade] = useState(false);
  const [isSharingMaterial, setIsSharingMaterial] = useState(false);
  const [isSchedulingExam, setIsSchedulingExam] = useState(false);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [notice, setNotice] = useState("");
  const isStudent = user?.role === "student";
  const isTeacher = user?.role === "teacher";

  function handleCreateTimetable(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const className = data.get("className");
    const subject = data.get("subject");

    setItems((current) => [
      {
        id: `AC-${String(current.length + 1).padStart(2, "0")}`,
        title: `${className} timetable`,
        detail: `${subject} period added and ready for teacher assignment`,
      },
      ...current,
    ]);
    setIsCreatingTimetable(false);
    setNotice(`Timetable entry created for ${className}.`);
  }

  function handleCreateClass(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setClasses((current) => [
      {
        name: data.get("name"),
        section: data.get("section"),
        academicYear: data.get("academicYear"),
      },
      ...current,
    ]);
    setIsCreatingClass(false);
    setNotice(
      `${data.get("name")} ${data.get("section")} created for ${data.get("academicYear")}.`,
    );
  }

  function handleAddSubject(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubjects((current) => [
      {
        className: data.get("className"),
        subject: data.get("subject"),
        teacher: data.get("teacher"),
      },
      ...current,
    ]);
    setIsAddingSubject(false);
    setNotice(
      `${data.get("subject")} assigned to ${data.get("teacher")} for ${data.get("className")}.`,
    );
  }

  function handleEnterGrade(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const score = Number(data.get("score"));

    setGradebook((current) => [
      {
        student: data.get("student"),
        subject: data.get("subject"),
        score: `${score}%`,
        grade: calculateGrade(score),
        status: data.get("status"),
      },
      ...current,
    ]);
    setIsEnteringGrade(false);
    setNotice(
      `Grade saved for ${data.get("student")}. Grade calculation completed automatically.`,
    );
  }

  function handleScheduleExam(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExams((current) => [
      {
        title: data.get("title"),
        className: data.get("className"),
        date: data.get("date"),
        room: data.get("room"),
        status: "Scheduled",
      },
      ...current,
    ]);
    setIsSchedulingExam(false);
    setNotice(`${data.get("title")} scheduled in ${data.get("room")}.`);
  }

  function handleCreateAssignment(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAssignments((current) => [
      {
        title: data.get("title"),
        className: data.get("className"),
        subject: data.get("subject"),
        dueDate: data.get("dueDate"),
        status: "Open",
      },
      ...current,
    ]);
    setIsCreatingAssignment(false);
    setNotice(`${data.get("title")} assigned to ${data.get("className")}.`);
  }

  function generateReportCards() {
    setNotice(
      "Report cards generated for review and print. PDF export is ready for backend integration.",
    );
  }

  function handleShareMaterial(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get("materialFile");
    const title = data.get("title") || file?.name;

    setMaterials((current) => [
      {
        title,
        subject: data.get("subject"),
        type: file?.name ? file.name.split(".").pop().toUpperCase() : "Link",
      },
      ...current,
    ]);
    setIsSharingMaterial(false);
    setNotice(
      `${title} shared with ${data.get("className")}. Students will receive a notification.`,
    );
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">
            {isStudent
              ? "Student Academics"
              : isTeacher
                ? "Teacher Academics"
                : "Academic Management"}
          </span>
          <h2>
            {isStudent
              ? "My timetable, grades, and study materials"
              : isTeacher
                ? "Classes, grade entry, and learning materials"
                : "Classes, subjects, grades, and exams"}
          </h2>
        </div>
        {isTeacher ? (
          <div className="topbar-actions">
            <button
              className="button"
              type="button"
              onClick={() => setIsEnteringGrade(true)}
            >
              Enter grades
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setIsSharingMaterial(true)}
            >
              Share material
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setIsCreatingAssignment(true)}
            >
              Create assignment
            </button>
          </div>
        ) : user?.role === "admin" ? (
          <div className="topbar-actions">
            <button
              className="button"
              type="button"
              onClick={() => setIsCreatingClass(true)}
            >
              Create class
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setIsAddingSubject(true)}
            >
              Add subject
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setIsCreatingTimetable(true)}
            >
              Create timetable
            </button>
          </div>
        ) : null}
      </div>

      {notice ? <div className="notice">{notice}</div> : null}

      {isTeacher ? (
        <>
          <div className="card-grid">
            {teacherClasses.map((teacherClass) => (
              <article
                className="module-card"
                key={`${teacherClass.className}-${teacherClass.subject}`}
              >
                <span>{teacherClass.subject}</span>
                <h3>{teacherClass.className}</h3>
                <p>{teacherClass.nextPeriod}</p>
                <strong>{teacherClass.pendingGrades} grades pending</strong>
              </article>
            ))}
          </div>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Gradebook</h3>
              <span>Draft and submitted scores</span>
            </div>
            {gradebook.map((entry) => (
              <div
                className="list-row"
                key={`${entry.student}-${entry.subject}-${entry.score}`}
              >
                <div>
                  <strong>{entry.student}</strong>
                  <span>{entry.subject}</span>
                </div>
                <strong>{entry.score}</strong>
                <span className="status">Grade {entry.grade}</span>
                <span className="status">{entry.status}</span>
              </div>
            ))}
          </section>

          <div className="card-grid">
            {materials.map((material) => (
              <article
                className="module-card"
                key={`${material.title}-${material.subject}`}
              >
                <span>{material.subject}</span>
                <h3>{material.title}</h3>
                <p>{material.type} shared with students</p>
              </article>
            ))}
          </div>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Assignments</h3>
              <span>AC-08 · Create, distribute, and grade work</span>
            </div>
            {assignments.map((assignment) => (
              <div
                className="list-row"
                key={`${assignment.title}-${assignment.className}`}
              >
                <div>
                  <strong>{assignment.title}</strong>
                  <span>
                    {assignment.className} · {assignment.subject} · Due{" "}
                    {assignment.dueDate}
                  </span>
                </div>
                <span className="status">{assignment.status}</span>
              </div>
            ))}
          </section>
        </>
      ) : isStudent ? (
        <>
          <section className="list-panel">
            <div className="panel-title">
              <h3>Weekly timetable</h3>
              <span>Subjects and teachers</span>
            </div>
            {studentTimetable.map((period) => (
              <div
                className="list-row"
                key={`${period.day}-${period.time}-${period.subject}`}
              >
                <div>
                  <strong>{period.subject}</strong>
                  <span>
                    {period.day} · {period.time}
                  </span>
                </div>
                <span className="status">{period.teacher}</span>
              </div>
            ))}
          </section>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Published grades</h3>
              <span>No waiting until report card</span>
            </div>
            {studentGrades.map((grade) => (
              <div className="list-row" key={grade.subject}>
                <div>
                  <strong>{grade.subject}</strong>
                  <span>{grade.feedback}</span>
                </div>
                <strong>{grade.score}</strong>
                <span className="status">Grade {grade.grade}</span>
              </div>
            ))}
          </section>

          <div className="card-grid">
            {studyMaterials.map((material) => (
              <article className="module-card" key={material.title}>
                <span>{material.subject}</span>
                <h3>{material.title}</h3>
                <p>{material.type} available for download</p>
                <button
                  className="button"
                  type="button"
                  onClick={() =>
                    setNotice(`${material.title} is ready to download.`)
                  }
                >
                  Open material
                </button>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="card-grid">
            {items?.map((item) => (
              <article className="module-card" key={item.id}>
                <span>{item.id}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Classes and sections</h3>
              <span>AC-01 · Academic year setup</span>
            </div>
            {classes.map((classItem) => (
              <div
                className="list-row"
                key={`${classItem.name}-${classItem.section}`}
              >
                <strong>
                  {classItem.name} {classItem.section}
                </strong>
                <span className="status">{classItem.academicYear}</span>
              </div>
            ))}
          </section>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Subjects and teachers</h3>
              <span>AC-02 · Teacher assignment</span>
            </div>
            {subjects.map((subject) => (
              <div
                className="list-row"
                key={`${subject.className}-${subject.subject}`}
              >
                <div>
                  <strong>{subject.subject}</strong>
                  <span>{subject.className}</span>
                </div>
                <span className="status">{subject.teacher}</span>
              </div>
            ))}
          </section>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Grading system</h3>
              <span>AC-05 · Scale configuration</span>
            </div>
            <div className="list-row">
              <div>
                <strong>{gradingScale}</strong>
                <span>
                  A: 70+, B: 60-69, C: 50-59, D: 45-49, E: 40-44, F: below 40
                </span>
              </div>
              <select
                value={gradingScale}
                onChange={(event) => setGradingScale(event.target.value)}
              >
                <option>A-F Percentage</option>
                <option>Percentage Only</option>
                <option>GPA 5.0</option>
              </select>
            </div>
          </section>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Report cards</h3>
              <span>AC-06 · Generate and print</span>
            </div>
            <div className="list-row">
              <strong>Grade 8 Blue midterm report cards</strong>
              <button
                className="button"
                type="button"
                onClick={generateReportCards}
              >
                Generate report cards
              </button>
            </div>
          </section>

          <section className="list-panel">
            <div className="panel-title">
              <h3>Exam management</h3>
              <span>AC-07 · Schedule, rooms, results</span>
            </div>
            <div className="panel-form">
              <button
                className="button"
                type="button"
                onClick={() => setIsSchedulingExam(true)}
              >
                Schedule exam
              </button>
            </div>
            {exams.map((exam) => (
              <div className="list-row" key={`${exam.title}-${exam.date}`}>
                <div>
                  <strong>{exam.title}</strong>
                  <span>
                    {exam.className} · {exam.date} · {exam.room}
                  </span>
                </div>
                <span className="status">{exam.status}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {isCreatingTimetable ? (
        <Modal
          title="Create timetable entry"
          onClose={() => setIsCreatingTimetable(false)}
        >
          <form className="form-grid" onSubmit={handleCreateTimetable}>
            <label>
              Class
              <input name="className" required placeholder="Grade 8 Blue" />
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="Mathematics" />
            </label>
            <label>
              Period
              <input name="period" required placeholder="Monday 9:00 AM" />
            </label>
            <button className="button" type="submit">
              Save timetable
            </button>
          </form>
        </Modal>
      ) : null}

      {isCreatingClass ? (
        <Modal
          title="Create class/section"
          onClose={() => setIsCreatingClass(false)}
        >
          <form className="form-grid" onSubmit={handleCreateClass}>
            <label>
              Class
              <input name="name" required placeholder="Grade 8" />
            </label>
            <label>
              Section
              <input name="section" required placeholder="Blue" />
            </label>
            <label>
              Academic year
              <input name="academicYear" required placeholder="2026/2027" />
            </label>
            <button className="button" type="submit">
              Save class
            </button>
          </form>
        </Modal>
      ) : null}

      {isAddingSubject ? (
        <Modal title="Add subject" onClose={() => setIsAddingSubject(false)}>
          <form className="form-grid" onSubmit={handleAddSubject}>
            <label>
              Class
              <input name="className" required placeholder="Grade 8 Blue" />
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="Mathematics" />
            </label>
            <label>
              Teacher
              <input name="teacher" required placeholder="Grace Williams" />
            </label>
            <button className="button" type="submit">
              Assign subject
            </button>
          </form>
        </Modal>
      ) : null}

      {isEnteringGrade ? (
        <Modal
          title="Enter student grade"
          onClose={() => setIsEnteringGrade(false)}
        >
          <form className="form-grid" onSubmit={handleEnterGrade}>
            <label>
              Student
              <input name="student" required placeholder="Student full name" />
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="Mathematics" />
            </label>
            <label>
              Score
              <input name="score" min="0" max="100" required type="number" />
            </label>
            <label>
              Status
              <select name="status" defaultValue="Draft">
                <option>Draft</option>
                <option>Submitted</option>
              </select>
            </label>
            <button className="button" type="submit">
              Save grade
            </button>
          </form>
        </Modal>
      ) : null}

      {isSharingMaterial ? (
        <Modal
          title="Share learning material"
          onClose={() => setIsSharingMaterial(false)}
        >
          <form className="form-grid" onSubmit={handleShareMaterial}>
            <label>
              Title
              <input name="title" placeholder="Optional material title" />
            </label>
            <label>
              Class
              <input name="className" required placeholder="Grade 8 Blue" />
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="Mathematics" />
            </label>
            <label>
              Upload file
              <input name="materialFile" required type="file" />
            </label>
            <button className="button" type="submit">
              Share material
            </button>
          </form>
        </Modal>
      ) : null}

      {isSchedulingExam ? (
        <Modal title="Schedule exam" onClose={() => setIsSchedulingExam(false)}>
          <form className="form-grid" onSubmit={handleScheduleExam}>
            <label>
              Exam title
              <input name="title" required placeholder="Midterm Mathematics" />
            </label>
            <label>
              Class
              <input name="className" required placeholder="Grade 8 Blue" />
            </label>
            <label>
              Date
              <input name="date" required type="date" />
            </label>
            <label>
              Room
              <input name="room" required placeholder="Hall A" />
            </label>
            <button className="button" type="submit">
              Schedule exam
            </button>
          </form>
        </Modal>
      ) : null}

      {isCreatingAssignment ? (
        <Modal
          title="Create assignment"
          onClose={() => setIsCreatingAssignment(false)}
        >
          <form className="form-grid" onSubmit={handleCreateAssignment}>
            <label>
              Title
              <input name="title" required placeholder="Algebra worksheet" />
            </label>
            <label>
              Class
              <input name="className" required placeholder="Grade 8 Blue" />
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="Mathematics" />
            </label>
            <label>
              Due date
              <input name="dueDate" required type="date" />
            </label>
            <button className="button" type="submit">
              Publish assignment
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  );
}
