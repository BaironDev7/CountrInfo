import Link from 'next/link';

async function getCountryData(id) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  if (!res.ok) {
    throw new Error('Error al cargar los datos del país');
  }
  const data = await res.json();
  return data[0];
}

export default async function CountryDetails({ params }) {
  const country = await getCountryData(params.id);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-4 text-green-600">CountrInfo</h1>
      <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
      <h3>Bandera:</h3>
      <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} className="w-64 h-auto mb-4" />
      <p><strong>Nombre Oficial:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Continente:</strong> {country.region}</p>
      <p><strong>Subregión:</strong> {country.subregion}</p>
      <p><strong>Raíz:</strong> {country.idd.root}</p>
      <p><strong>Sufijo:</strong> {country.idd.suffixes}</p>
      <p><strong>Dominio:</strong> {country.tld}</p>
      <p><strong>Abreviación:</strong> {country.cca3}</p>
      <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>País Independiente:</strong> {country.independent ? 'País independiente' : 'País No independiente'}</p>
      <p><strong>Zona Horaria:</strong> {country.timezones}</p>
      <p><strong>Latitud y Longitud:</strong> {country.latlng}</p>
      <p><strong>Area (km²):</strong> {country.area}</p>
      <p><strong>Cercado de tierra:</strong> {country.landlocked ? 'Cercado por tierra' : 'No cercado por tierra'}</p>
      <img src={country.coatOfArms.png} alt={`Escudo de ${country.name.common}`} className="w-64 h-auto mb-4" />
      <p><strong>Moneda(s):</strong> {
      country.currencies 
        ? Object.keys(country.currencies).map((currencyKey) => {
        const currency = country.currencies[currencyKey];
        return (
          <span key={currencyKey}>
            {currencyKey} - {currency.name} ({currency.symbol})
          </span>
          );
        })
        : 'No data'
      }</p>
      <div>
        <strong>Lenguajes:</strong>
        {country.languages ? (
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        ) : (
          <p>No hay información de lenguajes.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-2xl mb-2">Países Fronterizos:</h2>
        {country.borders && country.borders.length > 0 ? (
          <div className="flex flex-wrap">
            {country.borders.map((border) => (
              <Link key={border} href={`/country/${border}`} className="border p-2 m-2">
                <span>{border}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p>No tiene países fronterizos.</p>
        )}
      </div>
    </div>
  );
}