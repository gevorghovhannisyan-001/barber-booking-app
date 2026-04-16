import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/axios.js";

const TimePicker = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const selectedDate = state?.selectedDate;

    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedDate) return;

        const fetchBookedTimes = async () => {
            try {
                setIsLoading(true);

                const availableSlots = await api.get(`/availability/slots?date=${selectedDate}`);
                const res = availableSlots.data.slots;
                
                setAvailableTimes(res);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchBookedTimes();
    }, [selectedDate]);

    const handleNext = () => {
        if (!selectedTime) {
            alert(`${t('select_time_slot')}`);
            return;
        }

        navigate("/user-form", {
            state: {
                date: selectedDate,
                time: selectedTime,
            },
        });
    };

    if (!selectedDate) return <p>{t('no_date_selected')}</p>;
    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p>{t('plase_wait')}</p>
        </div>
        );
    }

    return (
        <div className="p-4">
            <span>{t('select_time')}</span>
            <p className="mb-4">{t('date_selected', { date: selectedDate })}</p>

            {/* Show available times */}
            {availableTimes.length === 0 ? (
                <p>{t('no_available_slots')}</p>
            ) : (
                <div className="flex flex-col space-y-3 mt-4">
                    {availableTimes.map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 border rounded cursor-pointer
                                ${selectedTime === time ? "bg-time-selected text-selected-foreground" : ""}
                            `}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            )}
            <button 
                onClick={() => navigate(-1)} 
                className="special-button left-[20px]"
            >
                {'< '}{t('go_back')}
            </button>
            <button
                onClick={handleNext}
                className="special-button right-[20px] shadow-xl"
            >
                {t('next')}{' >'}
            </button>
        </div>
    );
};

export default TimePicker;