import { Scissors, Instagram, Facebook, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-black text-white py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-2xl font-serif font-bold tracking-wider">
                GENTLEMAN'S CUT
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">{t("quick_links")}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">{t("navbar.home")}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t("about_us")}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t("services")}</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">{t("book_appointment")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">{t("contact")}</h4>
            <ul className="space-y-4 text-gray-400">
              <li>{t("address_line1")}</li>
              <li>{t("address_line2")}</li>
              <li>(374) 10-123-456</li>
              <li>info@gentlemanscut.am</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {year} Gentleman's Cut Barbershop. {t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t("footer.privacy_policy")}</a>
            <a href="#" className="hover:text-white">{t("footer.terms_of_service")}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer