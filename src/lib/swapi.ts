import { SWAPIResponse, Person, Planet, Film } from "@/types/swapi";

const BASE_URL = "https://swapi.dev/api";

export async function fetchPeople(page: number = 1, search?: string): Promise<SWAPIResponse<Person>> {
  const url = new URL(`${BASE_URL}/people/`);
  url.searchParams.append("page", page.toString());
  if (search) {
    url.searchParams.append("search", search);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch people: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchPerson(id: string): Promise<Person> {
  const response = await fetch(`${BASE_URL}/people/${id}/`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch person: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchFromUrl<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }

  return response.json();
}

// Utility to extract ID from SWAPI URL (e.g., https://swapi.dev/api/people/1/ -> 1)
export function extractId(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}
