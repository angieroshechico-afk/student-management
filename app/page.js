import Link from "next/link";
import StudentCard from "@/components/StudentCard";
import { getDbConnection } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let students = [];
  let databaseError = false;

  try {
    const db = await getDbConnection();
    try {
      const [rows] = await db.execute(
        "SELECT * FROM students ORDER BY created_at DESC",
      );
      students = rows;
    } finally {
      await db.end();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    databaseError = true;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Directory
            </h1>
            <p className="mt-1 text-gray-600">
              Browse enrolled students and their details.
            </p>
          </div>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow transition-colors hover:bg-blue-700"
          >
            + Register New Student
          </Link>
        </div>

        {databaseError ? (
          <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
            Unable to load students. Set your MySQL credentials in .env.local
            and make sure the database is running.
          </p>
        ) : students.length === 0 ? (
          <p className="text-gray-600">No students found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
