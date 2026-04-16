import { motion } from "framer-motion";
import services from "../utils/serviceUtils";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-block px-3 py-1 mb-4 border border-primary/30 text-primary text-sm font-bold tracking-widest uppercase">
                    {t("service.caption")}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
                    {t("service.title")}
                </h2>
                <p className="text-muted-foreground text-lg">
                    {t("service.description")}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl shadow-md p-6 
                        hover:shadow-lg transition-shadow text-card-foreground"
                    >
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                            <service.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">{t(`service.${service.title}.name`)}</h3>
                        <p className="text-muted-foreground mb-4">{t(`service.${service.title}.description`)}</p>
                        <div className="text-2xl font-bold text-primary">{service.price}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Services;