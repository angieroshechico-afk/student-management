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
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-[#fff8f7] to-orange-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-10 overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-100 via-rose-50 to-orange-100 p-7 shadow-sm sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/40"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-rose-700">
                Campus community
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
                Student Directory
              </h1>
              <p className="mt-3 max-w-xl text-base text-rose-900/75">
                Get to know the people, programs, and places that make our
                student community special.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {!databaseError && (
                <div className="rounded-2xl border border-white/70 bg-white/70 px-5 py-3 text-center shadow-sm backdrop-blur">
                  <p className="text-2xl font-extrabold text-rose-700">
                    {students.length}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-900/70">
                    Students
                  </p>
                </div>
              )}
              <Link
                href="/register"
                className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
              >
                + Register New Student
              </Link>
            </div>
          </div>
        </header>

        {databaseError ? (
          <p
            role="alert"
            className="rounded-2xl border border-red-200 bg-white p-5 text-red-800 shadow-sm"
          >
            Unable to load students. Set your MySQL credentials in .env.local
            and make sure the database is running.
          </p>
        ) : students.length === 0 ? (
          <p className="rounded-2xl border border-pink-100 bg-white p-8 text-center text-gray-600 shadow-sm">
            No students found yet. Register the first student to get started!
          </p>
        ) : (
          <section aria-label="Students">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Meet the students
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  A little snapshot of our growing community.
                </p>
              </div>
              <span className="hidden rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-rose-800 shadow-sm sm:inline-flex">
                {students.length} {students.length === 1 ? "profile" : "profiles"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
