"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch de datos desde la API de países
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error al cargar los datos de la API:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Filtrado de países por búsqueda y región
    const results = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (region === '' || country.region === region)
    );
    setFilteredCountries(results);
  }, [searchTerm, region, countries]);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-4 text-green-600">CountrInfo</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar un país..."
          className="border p-2 mb-4 md:mb-0 md:mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Todas las regiones</option>
          <option value="Africa">África</option>
          <option value="Americas">América</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map((country) => (
          <Link key={country.cca3} href={`/country/${country.cca3}`}>
            <div className="border p-4 cursor-pointer hover:shadow-lg">
              <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} className="w-full h-40 object-contain mb-2" />
              <h2 className="font-semibold text-lg">{country.name.common}</h2>
              <p>Región: {country.region}</p>
              <p>Población: {country.population.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}