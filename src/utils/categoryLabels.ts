import type { ActivityCategory } from '@/types'

export const getCategoryLabel = (category: ActivityCategory): string => {
  const categoryLabels: Record<ActivityCategory, string> = {
    jardin: 'Jardin',
    parc: 'Parc',
    chateau: 'Château',
    musee: 'Musée',
    expo: 'Exposition',
    spectacle: 'Spectacle',
    quartier: 'Quartier',
    tourisme_historique: 'Tourisme historique',
    autre: 'Autre',
  }

  return categoryLabels[category] || category
}
