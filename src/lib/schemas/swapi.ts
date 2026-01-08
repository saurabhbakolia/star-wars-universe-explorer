import { z } from 'zod';

// Base URL schema for SWAPI resources
const urlSchema = z.string().url();

// Film schema
export const filmSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(urlSchema),
  planets: z.array(urlSchema),
  starships: z.array(urlSchema),
  vehicles: z.array(urlSchema),
  species: z.array(urlSchema),
  created: z.string(),
  edited: z.string(),
  url: urlSchema,
});

// Character schema
export const characterSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: urlSchema,
  films: z.array(urlSchema),
  species: z.array(urlSchema),
  vehicles: z.array(urlSchema),
  starships: z.array(urlSchema),
  created: z.string(),
  edited: z.string(),
  url: urlSchema,
});

// Starship schema
export const starshipSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmospheric_speed: z.string().optional(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(urlSchema),
  films: z.array(urlSchema),
  created: z.string(),
  edited: z.string(),
  url: urlSchema,
});

// Planet schema
export const planetSchema = z.object({
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(urlSchema),
  films: z.array(urlSchema),
  created: z.string(),
  edited: z.string(),
  url: urlSchema,
});

// API Response schemas
// SWAPI.info returns a direct array, not a paginated object
export const filmsResponseSchema = z.array(filmSchema);
export const charactersResponseSchema = z.array(characterSchema);
export const starshipsResponseSchema = z.array(starshipSchema);
export const planetsResponseSchema = z.array(planetSchema);

// Type exports
export type Film = z.infer<typeof filmSchema>;
export type Character = z.infer<typeof characterSchema>;
export type Starship = z.infer<typeof starshipSchema>;
export type Planet = z.infer<typeof planetSchema>;
export type FilmsResponse = z.infer<typeof filmsResponseSchema>; // Array of films
export type CharactersResponse = z.infer<typeof charactersResponseSchema>; // Array of characters
export type StarshipsResponse = z.infer<typeof starshipsResponseSchema>; // Array of starships
export type PlanetsResponse = z.infer<typeof planetsResponseSchema>; // Array of planets
