import { apiClient } from './client';
import {
  filmsResponseSchema,
  charactersResponseSchema,
  starshipsResponseSchema,
  planetsResponseSchema,
  filmSchema,
  characterSchema,
  starshipSchema,
  planetSchema,
  type Film,
  type Character,
  type Starship,
  type Planet,
  type FilmsResponse,
  type CharactersResponse,
  type StarshipsResponse,
  type PlanetsResponse,
} from '../schemas/swapi';

export class SwapiService {
  // Films
  async getFilms(): Promise<FilmsResponse> {
    const data = await apiClient.get<unknown>('/films');
    return filmsResponseSchema.parse(data);
  }

  async getFilm(id: string): Promise<Film> {
    const data = await apiClient.get<unknown>(`/films/${id}`);
    return filmSchema.parse(data);
  }

  // Characters
  async getCharacters(): Promise<CharactersResponse> {
    const data = await apiClient.get<unknown>('/people');
    return charactersResponseSchema.parse(data);
  }

  async getCharacter(id: string): Promise<Character> {
    const data = await apiClient.get<unknown>(`/people/${id}`);
    return characterSchema.parse(data);
  }

  async getCharacterByUrl(url: string): Promise<Character> {
    const data = await apiClient.get<unknown>(url);
    return characterSchema.parse(data);
  }

  // Starships
  async getStarships(): Promise<StarshipsResponse> {
    const data = await apiClient.get<unknown>('/starships');
    return starshipsResponseSchema.parse(data);
  }

  async getStarship(id: string): Promise<Starship> {
    const data = await apiClient.get<unknown>(`/starships/${id}`);
    return starshipSchema.parse(data);
  }

  async getStarshipByUrl(url: string): Promise<Starship> {
    const data = await apiClient.get<unknown>(url);
    return starshipSchema.parse(data);
  }

  // Planets
  async getPlanets(page = 1, search?: string): Promise<PlanetsResponse> {
    const params: Record<string, unknown> = { page };
    if (search) params.search = search;
    
    const data = await apiClient.get<unknown>('/planets', params);
    return planetsResponseSchema.parse(data);
  }

  async getPlanet(id: string): Promise<Planet> {
    const data = await apiClient.get<unknown>(`/planets/${id}`);
    return planetSchema.parse(data);
  }

  // Helper to extract ID from URL
  extractIdFromUrl(url: string): string {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? match[1] : '';
  }
}

export const swapiService = new SwapiService();
