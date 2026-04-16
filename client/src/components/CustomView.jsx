import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import hyLocale from "@fullcalendar/core/locales/hy-am";
import ruLocale from "@fullcalendar/core/locales/ru";
import enLocale from "@fullcalendar/core/locales/en-gb"; // or en
import { useTranslation } from "react-i18next";

import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";

const CustomCalendar = () => {
    const calendarRef = useRef(null);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    // NEW: State for storing selected date & time
    const [selectedDate, setSelectedDate] = useState(null);
    const [availability, setAvailability] = useState({}); // { "2024-07-01": "full", ... }

    const fetchMonthAvailability = async (month) => {
        try {
            const response = await api.get(`/month-availability?month=${month}`);
            setAvailability(response.data);
        } catch (error) {
            console.error("Error fetching month availability:", error);
        }
    };

    const armenianLocale = {
        code: "hy",
        buttonText: {
            today: "Այսօր",
            month: "Ամիս"
        },
        weekText: "Շբթ",
        dayNamesShort: ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"],
        armenianMonths: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"]
    };

    const calendarLocale = {
        en: "en",
        ru: "ru",
        hy: armenianLocale
    }

    const removeHighlightFromAll = () => {
        const calendarApi = calendarRef.current.getApi();
        const dayEls = calendarApi.el.querySelectorAll(".fc-daygrid-day");
        dayEls.forEach(el => el.classList.remove("day-selected"));
    };

    const highlightCell = (element) => {
        element.classList.toggle("day-selected");
    };

    const handleDateClick = (info) => {
        // 🚫 block days from previous/next month
        if (
            info.dayEl.classList.contains("fc-day-other") ||
            info.dayEl.classList.contains("fc-day-past") ||
            info.dayEl.classList.contains("fully-booked") 
        ) return;
        // Clear previous highlights
        removeHighlightFromAll();
        // Highlight selected cell
        highlightCell(info.dayEl);
        // Save clicked date
        const pickedDate = info.dateStr; // FullCalendar gives YYYY-MM-DD
        setSelectedDate(pickedDate);
    };

    const handleNext = () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        // Redirect to TimePicker page and pass date
        navigate("/time-picker", {
            state: { selectedDate },
        });
    };

    
    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[ruLocale, enLocale]}
                locale={
                    i18n.language === "hy" ? armenianLocale : calendarLocale[i18n.language]
                }
                firstDay={1}
                dateClick={handleDateClick}
                titleFormat={
                    i18n.language === "hy"
                        ? (info) => {
                            const month = armenianLocale.armenianMonths[info.date.month];
                            const year = info.date.year;
                            return `${month} ${year}`;
                        }
                    : { year: "numeric", month: "long" }
                }
                dayHeaderContent={(arg) => {
                    if (i18n.language === "hy") {
                        return armenianLocale.dayNamesShort[arg.date.getDay() === 0 ? 6 : arg.date.getDay() - 1];
                    }

                    return arg.text; // Default behavior for other languages
                }}
                datesSet={(info) => {
                    const date = info.view.currentStart;

                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const formattedMonth = `${year}-${month}`;

                    fetchMonthAvailability(formattedMonth);

                }}
                dayCellContent={(arg) => {
                    const date = arg.date.toLocaleDateString("en-CA");
                    
                    if (availability[date] === 'full') {
                        return (
                            <div className="flex justify-between">
                                <p className="max-lg:hidden text-sm
                                self-center mr-2 text-center">
                                    {t("fully_booked")}
                                </p>
                                <p>{arg.dayNumberText}</p>
                            </div>
                        )
                    }
                    
                    return arg.dayNumberText;
                }}
                dayCellClassNames={(arg) => {
                    const date = arg.date.toLocaleDateString("en-CA");
                    if (availability[date] === 'full') {
                        return "fully-booked";
                    }
                    const day = arg.date.getDay();
                    // Disable weekends
                    if (day === 0 || day === 6) {
                        return "fc-day-disabled";
                    }

                    return "";
                }}
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "today",
                }}
                customButtons={{
                    today: {
                        text: `📅 ${t("calendar.today")}`,
                        click: () => {
                            const calendarApi = calendarRef.current.getApi();
                            calendarApi.today();
                        },
                    },
                }}
            />
                {/* NAVIGATION BUTTONS */}
            <button 
                onClick={() => navigate(-1)} 
                className="special-button left-[20px]"
            >
                {'< '}{t("go_back")}
            </button>
            <button 
                onClick={handleNext}
                className="special-button right-[20px]"
            >
                {t("next")}{' >'}
            </button>
        </div>
    );
};

export default CustomCalendar;
