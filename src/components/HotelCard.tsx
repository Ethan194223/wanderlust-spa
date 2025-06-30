/* src/components/HotelCard.tsx */
import { Link } from 'react-router-dom';
import type { Hotel } from '@/services/hotelService';
import placeholder from '@/assets/placeholder.jpg';   // whatever you already use

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article
      className="
        bg-white rounded-xl overflow-hidden shadow-sm            /* base state */
        motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg
        transition-all duration-200 ease-in-out transform-gpu     /* smooth */
      "
    >
      <Link to={`/hotels/${hotel.id}`}>
        <img
          src={hotel.imageUrl ?? placeholder}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="text-lg font-semibold">{hotel.name}</h2>
          {/* any other meta */}
        </div>
      </Link>
    </article>
  );
}
