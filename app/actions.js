"use server";

import { redirect } from "next/navigation";
import { getDbConnection } from "@/lib/db";

function getField(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function registerStudent(_previousState, formData) {
  const student = {
    first_name: getField(formData, "firstName"),
    last_name: getField(formData, "lastName"),
    email: getField(formData, "email"),
    phone: getField(formData, "phone"),
    street_address: getField(formData, "streetAddress"),
    city: getField(formData, "city"),
    province_state: getField(formData, "province"),
    country: getField(formData, "country") || "Canada",
    postal_code: getField(formData, "postalCode"),
    program: getField(formData, "program"),
    year: getField(formData, "year"),
  };

  const requiredFields = [
    "first_name",
    "last_name",
    "email",
    "street_address",
    "city",
    "province_state",
    "country",
    "postal_code",
    "program",
    "year",
  ];

  if (requiredFields.some((field) => !student[field])) {
    return { error: "Please complete all required fields." };
  }

  let db;
  try {
    db = await getDbConnection();
    await db.execute(
      `INSERT INTO students
        (first_name, last_name, email, phone, street_address, city, province_state, country, postal_code, program, year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student.first_name,
        student.last_name,
        student.email,
        student.phone,
        student.street_address,
        student.city,
        student.province_state,
        student.country,
        student.postal_code,
        student.program,
        student.year,
      ],
    );
  } catch (error) {
    console.error("Unable to register student:", error);
    return {
      error:
        "Unable to register the student. Check your database connection and make sure the email is not already registered.",
    };
  } finally {
    if (db) {
      await db.end();
    }
  }

  redirect("/");
}
