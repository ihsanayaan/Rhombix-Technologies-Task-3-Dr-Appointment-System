import { useState } from "react";
import Card from "../components/Card";

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);

    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-semibold mb-6">Calendar</h1>

            <Card>
                <h2 className="text-xl font-semibold mb-4">January 2025</h2>

                <div className="grid grid-cols-7 gap-3">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDate(day)}
                            className={`p-4 rounded-xl text-center border 
                                ${
                                    selectedDate === day
                                        ? "bg-accent text-black border-accent"
                                        : "bg-[#1A1A1A] text-white border-[#333] hover:bg-[#222]"
                                }
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {selectedDate && (
                    <div className="mt-6 p-4 rounded-xl bg-[#111] border border-[#333]">
                        <p className="text-gray-300">
                            Selected Date:
                        </p>
                        <h3 className="text-xl font-semibold text-accent">
                            January {selectedDate}, 2025
                        </h3>
                    </div>
                )}
            </Card>
        </div>
    );
}
