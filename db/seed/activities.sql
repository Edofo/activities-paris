-- ============================================
-- SEED: ACTIVITÉS PARIS
-- ============================================
-- Insère les activités parisiennes dans la base de données
-- Date: 2024-01-15
-- 
-- Note: Les IDs sont générés automatiquement
-- Vous pouvez adapter les images_url selon vos besoins

INSERT INTO activities (name, description, category, image_url, location, arrondissement, price_range, duration, tags, website) VALUES
-- Culture
('Musée du Louvre', 'Le plus grand musée du monde, abritant la Joconde et des milliers d''œuvres d''art exceptionnelles.', 'culture', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', 'Rue de Rivoli', '1er arrondissement', 'euro2', '3-4 heures', ARRAY['art', 'histoire', 'monument'], 'https://www.louvre.fr'),
('Musée d''Orsay', 'Ancienne gare transformée en musée, célèbre pour sa collection d''art impressionniste.', 'culture', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'Rue de la Légion d''Honneur', '7e arrondissement', 'euro2', '2-3 heures', ARRAY['art', 'impressionnisme', 'architecture'], 'https://www.musee-orsay.fr'),
('Centre Pompidou', 'Musée d''art moderne et contemporain avec une architecture unique et des expositions innovantes.', 'culture', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'Place Georges-Pompidou', '4e arrondissement', 'euro2', '2-3 heures', ARRAY['art moderne', 'architecture', 'expositions'], 'https://www.centrepompidou.fr'),
('Opéra Garnier', 'Palais Garnier, chef-d''œuvre architectural du 19e siècle, visites guidées et spectacles.', 'culture', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'Place de l''Opéra', '9e arrondissement', 'euro3', '1-2 heures', ARRAY['architecture', 'opéra', 'histoire'], 'https://www.operadeparis.fr'),
('Catacombes de Paris', 'Ossuaire souterrain historique avec des kilomètres de galeries et des millions de squelettes.', 'culture', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', '1 Avenue du Colonel Henri Rol-Tanguy', '14e arrondissement', 'euro2', '1 heure', ARRAY['histoire', 'souterrain', 'insolite'], 'https://www.catacombes.paris.fr'),

-- Gastronomie
('Marché des Enfants Rouges', 'Plus ancien marché couvert de Paris, avec des stands de cuisine du monde entier.', 'gastronomie', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', '39 Rue de Bretagne', '3e arrondissement', 'euro', '1-2 heures', ARRAY['marché', 'street food', 'diversité'], NULL),
('Food Tour du Marais', 'Découverte culinaire guidée du quartier du Marais avec dégustations de spécialités parisiennes.', 'gastronomie', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 'Le Marais', '4e arrondissement', 'euro2', '3 heures', ARRAY['tour guidé', 'dégustation', 'culture'], NULL),
('Cours de Cuisine Française', 'Apprenez à préparer des plats français traditionnels avec un chef professionnel.', 'gastronomie', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', 'Plusieurs adresses', 'Variable', 'euro3', '3-4 heures', ARRAY['cours', 'apprentissage', 'français'], NULL),

-- Sport
('Vélo sur les Quais de Seine', 'Balade à vélo le long de la Seine avec vélos en libre-service, parcours sécurisé.', 'sport', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800', 'Quais de Seine', 'Plusieurs arrondissements', 'euro', '2-3 heures', ARRAY['vélo', 'plein air', 'sport'], NULL),
('Escalade Indoor', 'Salle d''escalade moderne avec murs de différentes difficultés pour tous niveaux.', 'sport', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800', 'Plusieurs salles', 'Variable', 'euro2', '2 heures', ARRAY['escalade', 'sport', 'intérieur'], NULL),
('Piscine Joséphine Baker', 'Piscine flottante sur la Seine avec vue panoramique sur Paris, piscine extérieure.', 'sport', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', 'Quai François Mauriac', '13e arrondissement', 'euro', '1-2 heures', ARRAY['piscine', 'vue', 'sport'], NULL),

-- Nature
('Jardin des Plantes', 'Jardin botanique historique avec serres, ménagerie et muséum d''histoire naturelle.', 'nature', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', '57 Rue Cuvier', '5e arrondissement', 'euro', '2-3 heures', ARRAY['jardin', 'nature', 'botanique'], 'https://www.jardindesplantes.net'),
('Bois de Vincennes', 'Grand parc boisé avec lacs, zoo, château et nombreuses activités de plein air.', 'nature', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', 'Bois de Vincennes', '12e arrondissement', 'gratuit', '3-4 heures', ARRAY['parc', 'nature', 'plein air'], NULL),
('Parc des Buttes-Chaumont', 'Parc romantique avec falaises, grottes, pont suspendu et vue panoramique sur Paris.', 'nature', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', '1 Rue Botzaris', '19e arrondissement', 'gratuit', '2 heures', ARRAY['parc', 'vue', 'romantique'], NULL),
('Jardin du Luxembourg', 'Magnifique jardin à la française avec bassin, statues et nombreuses activités.', 'nature', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', 'Rue de Vaugirard', '6e arrondissement', 'gratuit', '1-2 heures', ARRAY['jardin', 'détente', 'central'], NULL),

-- Shopping
('Galeries Lafayette', 'Grand magasin emblématique avec coupole Art Nouveau et vue sur Paris depuis le toit.', 'shopping', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', '40 Boulevard Haussmann', '9e arrondissement', 'euro3', '2-3 heures', ARRAY['shopping', 'architecture', 'luxe'], 'https://www.galerieslafayette.com'),
('Marché aux Puces de Saint-Ouen', 'Plus grand marché aux puces du monde avec antiquités, vintage et objets insolites.', 'shopping', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 'Rue des Rosiers', 'Saint-Ouen', 'euro', '3-4 heures', ARRAY['marché', 'vintage', 'antiquités'], NULL),
('Shopping dans le Marais', 'Quartier branché avec boutiques de créateurs, concept stores et galeries d''art.', 'shopping', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 'Le Marais', '4e arrondissement', 'euro2', '2-3 heures', ARRAY['shopping', 'mode', 'créateurs'], NULL),

-- Divertissement
('Croisière sur la Seine', 'Balade en bateau sur la Seine avec vue sur les monuments parisiens, repas possible.', 'divertissement', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', 'Quais de Seine', 'Plusieurs arrondissements', 'euro2', '1-2 heures', ARRAY['bateau', 'vue', 'romantique'], NULL),
('Escape Game Parisien', 'Aventure immersive dans des salles à thème parisien, résolvez des énigmes en équipe.', 'divertissement', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', 'Plusieurs adresses', 'Variable', 'euro2', '1 heure', ARRAY['jeu', 'équipe', 'énigmes'], NULL),
('Comédie Musicale', 'Spectacle de comédie musicale dans un théâtre parisien, plusieurs choix disponibles.', 'divertissement', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', 'Plusieurs théâtres', 'Variable', 'euro3', '2-3 heures', ARRAY['spectacle', 'théâtre', 'musique'], NULL),
('Tour Eiffel', 'Monument emblématique de Paris, ascension possible et vue panoramique exceptionnelle.', 'divertissement', 'https://images.unsplash.com/photo-1511739001646-5cfb4c02a042?w=800', 'Champ de Mars', '7e arrondissement', 'euro2', '2 heures', ARRAY['monument', 'vue', 'emblème'], 'https://www.toureiffel.paris'),
('Notre-Dame de Paris', 'Cathédrale gothique emblématique en cours de restauration, visite extérieure possible.', 'culture', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', '6 Parvis Notre-Dame', '4e arrondissement', 'gratuit', '1 heure', ARRAY['architecture', 'histoire', 'religion'], NULL);

