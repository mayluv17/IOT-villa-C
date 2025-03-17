'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShadBarChart } from '@/components/bar-chart';
import Occupancy from '@/components/occupancy';
import { RadialChart } from '@/components/radial-chart';
import { WaterLeakage } from '@/components/waterLeakage';

export default function Dashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Fetch weather data
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&units=metric&appid=YOUR_API_KEY')
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error('Error fetching weather:', err));

    // Update time every second
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Helsinki',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setTime(now.toLocaleString('en-US', options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Left Column - Time & Weather */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Helsinki, Finland</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-2xl font-bold">{time}</div>

          {weather && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width={50}
                  height={50}
                />
                <span className="text-xl">{Math.round(weather.main.temp)}°C</span>
              </div>
              <div className="capitalize">{weather.weather[0].description}</div>
              <div>Humidity: {weather.main.humidity}%</div>
              <div>Wind: {weather.wind.speed} m/s</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Middle Column - YouTube Video */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Featured Video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Stats */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Water Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <WaterLeakage />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <Occupancy />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
