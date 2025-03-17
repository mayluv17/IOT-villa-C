'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export default function Dashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [time, setTime] = useState<{ date: string; time: string }>({ date: '', time: '' });

  useEffect(() => {
    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error('Error fetching weather:', err));

    // Update time every second
    const interval = setInterval(() => {
      const now = new Date();

      // Format for day and date
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Helsinki',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      // Format for time
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Helsinki',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const dateString = now.toLocaleString('en-US', dateOptions);
      const timeString = now.toLocaleString('en-US', timeOptions);

      setTime({
        date: dateString,
        time: timeString,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 h-screen p-10">
      {/* Left Column - Time, Weather, Rules & Activities */}
      <div className="col-span-3 h-full overflow-auto flex flex-col gap-4">
        {/* Time & Weather Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Helsinki, Finland
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="text-center">
              {/* Time */}
              <div className="text-5xl font-bold tracking-tight mb-2">{time.time}</div>

              {/* Day of week and date */}
              <div className="text-xl font-medium">{time.date}</div>
            </div>

            {weather && (
              <div className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    width={80}
                    height={80}
                    className="drop-shadow-md"
                  />
                </div>
                <div className="text-3xl font-bold text-center">{Math.round(weather.main.temp)}°C</div>
                <div className="capitalize text-center font-medium">{weather.weather[0].description}</div>
                <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2"></div>
                <div className="grid grid-cols-2 gap-4 w-full text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-muted-foreground">Humidity</span>
                    <span className="font-medium">{weather.main.humidity}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-muted-foreground">Wind</span>
                    <span className="font-medium">{weather.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* House Rules Card */}
        <Card>
          <CardHeader className="bg-amber-100 dark:bg-amber-900/20">
            <CardTitle className="text-lg">Cottage Rules</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Check-in: 3:00 PM, Check-out: 11:00 AM</li>
              <li>No smoking inside the cottage</li>
              <li>Pets allowed with prior approval</li>
              <li>Quiet hours from 10:00 PM to 7:00 AM</li>
              <li>Please conserve water and electricity</li>
              <li>Sauna available from 6:00 PM to 9:00 PM</li>
              <li>Clean dishes before departure</li>
              <li>Sort waste according to recycling guidelines</li>
              <li>Report any damages immediately</li>
              <li>Lock doors and windows when leaving</li>
            </ul>
          </CardContent>
        </Card>

        {/* Winter Activities Card */}
        <Card>
          <CardHeader className="bg-blue-100 dark:bg-blue-900/20">
            <CardTitle className="text-lg">Winter Activities</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Cross-country skiing (equipment in storage shed)</li>
              <li>Ice fishing on the frozen lake (300m away)</li>
              <li>Snowshoeing trails start behind the cottage</li>
              <li>Traditional Finnish sauna with ice swimming</li>
              <li>Northern Lights viewing (clear nights only)</li>
              <li>Husky sledding tours (book at reception)</li>
              <li>Ice skating on the cleared lake area</li>
              <li>Snowmobile rentals available nearby</li>
              <li>Winter barbecue in the outdoor firepit</li>
              <li>Reindeer farm visits (15km away)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Middle Column - YouTube Video */}
      <Card className="col-span-9 h-full">
        <CardHeader>
          <CardTitle>Featured Video</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex items-center justify-center">
          <div className="aspect-video w-full h-full max-h-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/rYv1UqgOyFs?si=8xg8U2_SrbvpQHLL&amp;controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
