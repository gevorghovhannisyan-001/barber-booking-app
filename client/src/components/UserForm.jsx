import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { loading } from "../assets";
import { useTranslation } from "react-i18next";

const UserForm = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const selectedDate = state?.date;
    const selectedTime = state?.time;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // API call
        try {
            setIsLoading(true);

            await api.post("/bookings/checkout", {
                date: selectedDate,
                time: selectedTime,
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                acceptedTerms: true
            });
            // On success, navigate to confirmation page
            navigate("/confirmation", {
                state: {
                    bookingDetails: {
                        date: selectedDate,
                        time: selectedTime,
                        firstName: formData.firstname,
                        lastName: formData.lastname,
                        email: formData.email,
                        phone: formData.phone
                    }
                }
            });

            setIsLoading(false);
        } catch (error) {
            console.error("Booking failed:", error);
            alert(t('booking_failed'));
        }
        finally {
            setIsLoading(false);
        }
    }

    if (!selectedDate || !selectedTime) return <p>No date or time selected</p>;

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <p className="mb-1">{t('date')}: {selectedDate}</p>
        <p className="mb-3">{t('time')}: {selectedTime}</p>
      </div>
      <div className="w-full bg-card max-w-2xl mx-auto p-6 
      absolute top-[85px] left-1/2 -translate-x-1/2 
      rounded-lg border-2 border-border shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-13 h-13 p-2 flex items-center 
          justify-center text-3xl">
            {/* <img src={user} alt="User Icon" className="w-full h-full"  /> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-circle-user h-full w-full text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                data-fg-bxjy2="1.13:1.9668:/src/app/components/UserForm.tsx:38:9:1004:48:e:UserCircle::::::C9U">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/>
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
                </svg> 
           
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl">{t('booking.user_booking')}</span>
            <p className="text-sm text-muted-foreground">{t('booking.info')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 flex flex-col">
                <label htmlFor="firstName">
                  {t('booking.first_name')} <span className="text-red-500">*</span>
                </label>
              <input
                id="firstName"
                placeholder="John"
                onChange = {(e) => setFormData({...formData, firstname: e.target.value})}
                value={formData.firstName}
                required
              />

            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="lastName">
                {t('booking.last_name')} <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                placeholder="Doe"
                onChange = {(e) => setFormData({...formData, lastname: e.target.value})}
                value={formData.lastName}
                required
              />
          
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2 flex flex-col">
            <label htmlFor="email">
                {t('booking.email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                onChange = {(e) => setFormData({...formData, email: e.target.value})}
                value={formData.email}
                required
              />
          </div>

          {/* Phone Field */}
          <div className="space-y-2 flex flex-col">
            <label htmlFor="phone">
              {t('booking.phone_number')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1234567890"
              onChange = {(e) => setFormData({...formData, phone: e.target.value})}
              value={formData.phone}
              required
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="w-4 h-4 accent-primary"
              required
            />
            <div className="space-y-1">
              <label
                htmlFor="agreeToTerms"
                className="text-sm font-normal cursor-pointer"
              >
                {t('booking.agree_terms')}
                <span className="text-red-500">*</span>
              </label>
              
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full">
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary text-primary-foreground font-bold uppercase
              px-6 py-2 rounded-md cursor-pointer 
              disabled:opacity-50 disabled:cursor-not-allowed" 
            > 
              {isLoading && (
                <img 
                  src={loading}
                  alt="Loading"
                  className="w-5 h-5 mr-2 inline-block"
                />
              )}
              {isLoading ? `${t('processing')}` : `${t('book_now')}`}
            </button>
          </div>
        </form>
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className="special-button left-[20px]"
      >
        {'< '}{t('go_back')}
      </button>
    </div>
  )
}

export default UserForm;