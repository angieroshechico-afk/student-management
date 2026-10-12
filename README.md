# Student Management

A student directory built with Next.js, React, Tailwind CSS, and MySQL. The app lists students from a MySQL database, provides a form to register a student, and can show current weather for a city when an OpenWeather API key is configured.

## Requirements

- Node.js and npm
- MySQL with the `oosd_webappdev` database and a `students` table
- An OpenWeather API key for the optional weather widget

## Setup

1. Open a terminal in the `student-management` folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and enter your local MySQL credentials. Add your OpenWeather API key if you want the weather widget.

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
- Optional city weather lookup using OpenWeather

The `students` table is expected to include `id`, `first_name`, `last_name`, `email`, `phone`, `street_address`, `city`, `province_state`, `country`, `postal_code`, `program`, `year`, and `created_at`.

Each of the eight sample students has a profile photo in `public/students`, rendered with Next.js `Image`. Students without a mapped photo display their initials.
