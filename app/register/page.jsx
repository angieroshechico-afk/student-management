"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { registerStudent } from "@/app/actions";

const initialFormState = { error: "" };

export default function RegisterPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherMessage, setWeatherMessage] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [formState, formAction, isPending] = useActionState(
    registerStudent,
    initialFormState,
  );

  useEffect(() => {
    const cityName = city.trim();
    if (!cityName) {
      setWeather(null);
      setWeatherMessage("");
      setLoadingWeather(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey || apiKey === "your-openweathermap-api-key") {
      setWeather(null);
      setWeatherMessage(
        "Add your OpenWeather API key to .env.local to see local weather.",
      );
      setLoadingWeather(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLoadingWeather(true);
      setWeather(null);
      setWeatherMessage("");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${encodeURIComponent(apiKey)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setWeatherMessage(
            response.status === 404
              ? "Weather is not available for that city."
              : "Unable to load weather right now.",
          );
          return;
        }

        const data = await response.json();
        if (data.main && data.weather?.[0]) {
          setWeather(data);
        } else {
          setWeatherMessage("Weather is not available for that city.");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Weather fetch error:", error);
          setWeatherMessage("Unable to load weather right now.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingWeather(false);
        }
      }
    }, 600);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [city]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Student Registration
          </h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Back to Directory
          </Link>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address
            </label>
            <input
              id="streetAddress"
              name="streetAddress"
              autoComplete="street-address"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                autoComplete="address-level2"
                required
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
              >
                Province/State
              </label>
              <input
                id="province"
                name="province"
                autoComplete="address-level1"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                autoComplete="postal-code"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div
            aria-live="polite"
            className="min-h-5 text-sm text-blue-800"
          >
            {loadingWeather && <p>Loading weather...</p>}
            {weather && (
              <p className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                Current weather in {weather.name}:{" "}
                <strong>{Math.round(weather.main.temp)}°C</strong>,{" "}
                {weather.weather[0].description}
              </p>
            )}
            {!weather && !loadingWeather && weatherMessage && (
              <p>{weatherMessage}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                autoComplete="country-name"
                defaultValue="Canada"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700"
              >
                Program
              </label>
              <input
                id="program"
                name="program"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                placeholder="e.g. Y1"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {formState?.error && (
            <p role="alert" className="text-sm text-red-700">
              {formState.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Registering..." : "Register Student"}
          </button>
        </form>
      </div>
    </main>
  );
}
