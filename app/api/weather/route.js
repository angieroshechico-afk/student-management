import { NextResponse } from "next/server";

export async function GET(request) {
  const city = new URL(request.url).searchParams.get("city")?.trim();

  if (!city || city.length > 100) {
    return NextResponse.json(
      { error: "Enter a city name to check its weather." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "WEATHER_API_KEY_MISSING" },
      { status: 503 },
    );
  }

  let response;
  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("q", city);
    url.searchParams.set("units", "metric");
    url.searchParams.set("appid", apiKey);

    response = await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("OpenWeather request failed:", error);
    return NextResponse.json(
      { error: "WEATHER_UPSTREAM_ERROR" },
      { status: 502 },
    );
  }

  if (response.status === 404) {
    return NextResponse.json(
      { error: "WEATHER_CITY_NOT_FOUND" },
      { status: 404 },
    );
  }

  if (response.status === 401) {
    return NextResponse.json(
      { error: "WEATHER_API_KEY_INVALID" },
      { status: 502 },
    );
  }

  if (response.status === 429) {
    return NextResponse.json(
      { error: "WEATHER_RATE_LIMITED" },
      { status: 429 },
    );
  }

  if (!response.ok) {
    console.error("OpenWeather returned status:", response.status);
    return NextResponse.json(
      { error: "WEATHER_UPSTREAM_ERROR" },
      { status: 502 },
    );
  }

  const weather = await response.json();
  if (!weather.main || !weather.weather?.[0] || !weather.name) {
    console.error("OpenWeather returned an unexpected response.");
    return NextResponse.json(
      { error: "WEATHER_UPSTREAM_ERROR" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    name: weather.name,
    main: { temp: weather.main.temp },
    weather: [{ description: weather.weather[0].description }],
  });
}
