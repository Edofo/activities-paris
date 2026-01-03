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
  | 'jardin'
  | 'parc'
  | 'chateau'
  | 'musee'
  | 'expo'
  | 'spectacle'
  | 'quartier'
  | 'tourisme_historique'
  | 'autre'

export type PriceRange = 'gratuit' | '€' | '€€' | '€€€'
export type PriceRangeDB = 'gratuit' | 'euro' | 'euro2' | 'euro3'
