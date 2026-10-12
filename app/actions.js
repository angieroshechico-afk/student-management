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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
    return { error: "Enter a valid email address." };
  }

  const postalCode = student.postal_code.trim();
  const country = student.country.toLowerCase();
  const isCanadianPostalCode =
    /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i.test(postalCode);
  const isUsPostalCode = /^\d{5}(?:-\d{4})?$/.test(postalCode);

  if (
    ((country === "canada" || country === "ca") && !isCanadianPostalCode) ||
    ((country === "united states" ||
      country === "united states of america" ||
      country === "usa" ||
      country === "us") &&
      !isUsPostalCode) ||
    (!["canada", "ca", "united states", "united states of america", "usa", "us"].includes(
      country,
    ) &&
      !/^[A-Z0-9][A-Z0-9 -]{1,10}$/i.test(postalCode))
  ) {
    return { error: "Enter a valid postal or ZIP code for the selected country." };
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
