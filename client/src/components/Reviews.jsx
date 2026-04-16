import { Star } from "lucide-react";
import reviews from "../utils/reviewsUtils";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-primary/30 text-primary text-sm font-bold tracking-widest uppercase">
            {t("reviews.caption")}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {t("reviews.title")}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-muted/30 h-full p-6 border-none rounded-none"
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-primary" size={20} />
                ))}
              </div>
              <p className="text-lg italic mb-6 text-muted-foreground ">{t(`reviews.${review.name}.text`)}</p>
              <div>
                <h4 className="font-bold font-serif">{t(`reviews.${review.name}.name`)}</h4>
                <span className="text-sm text-muted-foreground">
                  {t(`reviews.${review.name}.role`)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Leave a Review Button */}
        <div className="text-center mt-12">
          <button
            className="inline-block px-6 py-3 bg-primary 
            text-primary-foreground font-bold rounded-md 
            hover:bg-primary/90 cursor-pointer transition-all duration-300"
          >
            {t("leave_review")}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Reviews