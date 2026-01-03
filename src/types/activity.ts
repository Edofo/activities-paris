export interface Activity {
  id: string
  name: string
  description: string
  category: ActivityCategory
  imageUrl: string
  location: string
  arrondissement: string
  priceRange: PriceRange
  duration: string
  tags: Array<string>
  website?: string
}

export type ActivityCategory =
  | 'culture'
  | 'gastronomie'
  | 'sport'
  | 'nature'
  | 'shopping'
  | 'divertissement'

export type PriceRange = 'gratuit' | '€' | '€€' | '€€€'
export type PriceRangeDB = 'gratuit' | 'euro' | 'euro2' | 'euro3'
