
import Image from "next/image";

const studentPhotos = {
  1: "/students/student-1.jpg",
  2: "/students/student-2.jpg",
  3: "/students/student-3.jpg",
  4: "/students/student-4.jpg",
  5: "/students/student-5.jpg",
  6: "/students/student-6.jpg",
  7: "/students/student-7.jpg",
  8: "/students/student-8.jpg",
  9: "/students/student-9.jpeg",
};

export default function StudentCard({ student }) {
  const photo = studentPhotos[student.id];
  const initials = [student.first_name, student.last_name]
    .map((name) => name?.trim().charAt(0).toUpperCase())
    .filter(Boolean)
    .join("");

  const location = [
    student.street_address,
    student.city,
    student.province_state,
    student.postal_code,
    student.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-2 bg-gradient-to-r from-pink-300 via-rose-200 to-orange-200" />

      <div className="flex flex-col items-center p-6 text-center">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-pink-100 bg-pink-50 text-2xl font-bold text-rose-700 shadow-sm">
          {photo ? (
            <Image
              src={photo}
              alt={`${student.first_name} ${student.last_name}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center"
            >
              {initials}
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-gray-800">
          {student.first_name} {student.last_name}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Student ID: {student.id}
        </p>

        <span className="mt-3 rounded-full bg-pink-50 px-4 py-1.5 text-sm font-semibold text-rose-700">
          {student.program} · {student.year}
        </span>

        <div className="mt-5 w-full space-y-3 border-t border-pink-100 pt-4 text-left text-sm text-gray-600">
          {student.email && (
            <p className="break-words">
              <span className="mr-2">📧</span>
              {student.email}
            </p>
          )}

          {student.phone && (
            <p className="break-words">
              <span className="mr-2">📞</span>
              {student.phone}
            </p>
          )}

          {location && (
            <p className="break-words leading-relaxed">
              <span className="mr-2">📍</span>
              {location}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
