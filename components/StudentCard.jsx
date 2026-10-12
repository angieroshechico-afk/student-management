import Image from "next/image";

export default function StudentCard({ student }) {
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
    <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg">
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
        <Image
          src="/default-avatar.png"
          alt={`${student.first_name} ${student.last_name}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        {student.first_name} {student.last_name}
      </h2>
      <p className="text-sm font-medium text-gray-500">ID: {student.id}</p>
      <p className="mt-1 text-sm font-semibold text-blue-600">
        {student.program} - {student.year}
      </p>

      <div className="mt-4 w-full space-y-1 border-t pt-3 text-xs text-gray-500">
        {student.email && <p>📧 {student.email}</p>}
        {student.phone && <p>📞 {student.phone}</p>}
        {location && <p>📍 {location}</p>}
      </div>
    </div>
  );
}
