-- Delete the old constraint
ALTER TABLE activities DROP CONSTRAINT activities_category_check;

-- Add the new constraint with the updated categories
ALTER TABLE activities ADD CONSTRAINT activities_category_check 
  CHECK (category IN (
    'jardin', 'parc', 'chateau',
    'musee', 'expo', 'spectacle', 
    'quartier', 'tourisme_historique',
    'autre'
  ));