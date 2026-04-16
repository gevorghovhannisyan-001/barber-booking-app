import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Scissors } from "lucide-react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../features/LanguageSwith";

import { Sheet, SheetContent, SheetTrigger } from "./@ui/sheet";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navbar.home"), to: "hero" },
    { name: t("navbar.about"), to: "about" },
    { name: t("navbar.services"), to: "services" },
    { name: t("navbar.reviews"), to: "reviews" },
  ];

  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
        <div className="container px-4 pt-2
        flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Scissors />
                <span className="text-2xl 
                font-bold tracking-wider text-foreground">
                    GENTLEMAN'S CUT
                </span>
            </div>
            {/* Desktop Nav */}
            <div className="max-md:hidden flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            smooth={true}
                            duration={500}
                            className="text-sm font-medium hover:text-primary 
                            transition-colors cursor-pointer uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <LanguageSwitcher />
            </div>
            {/* Book Now Button */}
            <button 
                onClick={() => navigate("/booking")}
                className="max-md:hidden text-foreground 
                cursor-pointer font-bold tracking-wide max-lg:tracking-normal border border-primary 
                px-4 py-2 max-lg:px-2 max-lg:py-1 transition-colors uppercase">
                    {t("book_now")}
            </button>

            {/* Mobile Nav */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="cursor-pointer">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-card border-l border-border" >
                        <div className="flex flex-col gap-8 mt-10">
                            {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        className="text-xl font-serif font-bold 
                                        hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                            ))}
                            <LanguageSwitcher />
                            <button 
                            onClick={() => navigate("/booking")}
                            className="w-full bg-primary text-primary-foreground 
                            hover:bg-primary/90 font-bold tracking-wide py-2 
                            cursor-pointer rounded-none">
                                {t("book_appointment")}
                            </button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;