import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Confirmation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { bookingDetails } = location.state || {};
  const navigate = useNavigate();

  if (!bookingDetails) return <p>No booking details available.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
        <div className="p-6 max-w-lg bg-card rounded border-2 border-border shadow-md">
            <h1 className="text-2xl font-bold font-sans mb-4">{t('confirmation.title')}</h1>
            <p className="mb-4">{t('confirmation.message')}</p>
            <h2 className="text-xl font-semibold font-sans mb-2">{t('confirmation.details')}</h2>
            <ul className="list-disc pl-5 mb-4">
                <li>{t('date')}: {bookingDetails.date}</li>
                <li>{t('time')}: {bookingDetails.time}</li>
                <li>{t('name')}: {bookingDetails.firstName} {bookingDetails.lastName}</li>
                <li>{t('email')}: {bookingDetails.email}</li>
                <li>{t('phone')}: {bookingDetails.phone}</li>
            </ul>
            <p className="mb-4">{t('confirmation.late_message')}</p>
            <button 
                onClick={() => navigate("/")} 
                className="px-4 py-2 bg-secondary text-secondary-foreground 
                hover:bg-muted border border-gray-500 transition-all ease-in-out 
                rounded cursor-pointer"
            >
                {t('confirmation.back_to_home')}
            </button>
        </div>
    </div>
  )
}

export default Confirmation;