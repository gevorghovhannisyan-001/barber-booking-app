import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const date = new Date();
  const year = date.getFullYear();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section 
      id="hero"
      className="relative h-screen min-h-[600px] flex 
      items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="/hero-bg.png"
          alt="Barbershop Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-primary font-bold tracking-[0.2em] mb-4 uppercase text-sm md:text-base">
            {t("established.Est.")} {year} • {t("established.location")}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            {t("look_sharp")}, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D4AF37]">
              {t("feel_confident")}.
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-lg md:text-xl mb-10 font-light leading-relaxed">
            {t("hero_desc")}
          </p>

          <div className="flex flex-col max-sm:items-center sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/booking")} 
                className="min-w-[200px] h-14 text-lg bg-primary 
                text-primary-foreground hover:bg-primary/90 rounded-none 
                border-2 border-primary cursor-pointer transition-all duration-300 p-2">
                {t("book_appointment")}
              </button>
            <Link to="services" smooth={true} duration={500}>
              <button className="min-w-[200px] h-14 text-lg text-white 
              border cursor-pointer transition-all duration-300 border-white 
            hover:bg-white hover:text-black rounded-none bg-transparent p-2">
                {t("view_services")}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}

export default Hero