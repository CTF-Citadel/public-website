"use client";
import "./globals.css"
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2024-04-05T09:00:00"); // CTF start date

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]); // Add timeLeft as a dependency

  return (
    <div className="relative">
      <div className="h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <img src="https://tophack.at/imgs/tophack_red_team_logo.png" />
          <div className="w-full text-center">
            <h1 className="mt-10 text-white font-bold text-xl">An internal CTF event from HTBLuVA Villach.</h1>
          </div>
          <div className="text-white mt-24 text-center">
            <h2 className="font-bold text-xl">Countdown</h2>
            <p className="font-semibold">
            {timeLeft.days} Days : {timeLeft.hours} Hours : {timeLeft.minutes} Minutes : {timeLeft.seconds} Seconds Left
            </p>
          </div>
        </div>
        <BackgroundBeams />
      </div>
  
      {/* Absolute positioning for the yellow div */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <div className="bg-yellow-300 w-96 h-24 p-10 flex items-center justify-center">
          <img src="https://www.htl-villach.at/typo3conf/ext/htl_villach/Resources/Public/Images/htl_logo_box.svg" />
        </div>
      </div>
    </div>
  )
  
}