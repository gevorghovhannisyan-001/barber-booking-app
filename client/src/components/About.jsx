import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-0 -left-4 w-full h-full border-2 border-primary/20 translate-x-4 translate-y-4 z-0" />
            <img
              src="/about-barber.png"
              alt="Master Barber"
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 mb-4 border border-primary/30 text-primary text-sm font-bold tracking-widest uppercase">
              {t("about.caption")}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              {t("about.title")} <br /> {t("about.title_bold")}.
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {t("about.description.part1")}
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("about.description.part2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Master Barbers",
                "Premium Products",
                "Relaxing Atmosphere",
                "Complimentary Drinks",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{t(`about.${item}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About