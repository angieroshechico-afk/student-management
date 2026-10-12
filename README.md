# Student Management

A student directory built with Next.js, React, Tailwind CSS, and MySQL. The app lists students from a MySQL database, provides a form to register a student, and displays current weather for the entered city using the OpenWeather API.

## Requirements

- Node.js and npm
- MySQL with the `oosd_webappdev` database and a `students` table
- An OpenWeather API key for the city weather lookup

## Setup

1. Open a terminal in the `student-management` folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and enter your local MySQL credentials and OpenWeather API key. Use `OPENWEATHER_API_KEY` (not a `NEXT_PUBLIC_` variable) so the API key stays on the server.

   Keep `.env.local` private; it is excluded from Git.

4. Start the development server:

   ```bash
   npm run dev
   ```

   In PowerShell on Windows, use `npm.cmd run dev` if the execution policy blocks `npm`.

5. Visit [http://localhost:3000](http://localhost:3000).

## Available commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build

## Features

- Responsive student directory cards with initials, optional local photos, and contact/address details
- Student registration form backed by a MySQL server action
- City weather lookup with loading and error states using OpenWeather

The `students` table is expected to include `id`, `first_name`, `last_name`, `email`, `phone`, `street_address`, `city`, `province_state`, `country`, `postal_code`, `program`, `year`, and `created_at`.

Each of the nine sample students has a profile photo in `public/students`, rendered with Next.js `Image`. Students without a mapped photo display their initials.
