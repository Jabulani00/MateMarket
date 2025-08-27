import { Heart } from 'lucide-react';
import { useFavorites, FavoriteItem } from '../../contexts/FavoritesContext';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  product: FavoriteItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({ product, className = '', size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductFavorite) {
      removeFromFavorites(product.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(product);
      toast.success('Added to favorites');
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`
        inline-flex items-center justify-center p-2 rounded-full
        transition-all duration-200 hover:scale-110
        ${isProductFavorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
        }
        ${className}
      `}
      title={isProductFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={sizeClasses[size]} 
        fill={isProductFavorite ? 'currentColor' : 'none'}
      />
    </button>
  );
}