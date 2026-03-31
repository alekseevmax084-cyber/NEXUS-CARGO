import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  max?: number;
}

export default function StarRating({ rating = 5, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-[#B8960C] text-[#B8960C]" : "text-[#E8ECF0]"}
        />
      ))}
    </div>
  );
}
