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
      <h1 className="text-4xl text-center font-bold mb-4 text-green-600">CountrInfo</h1>
      <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
      <div className="flex flex-col md:flex-row items-center justify-between md:ml-10 md:mr-10 gap-4">
        <div className="w-full md:w-1/2">
          <strong className="text-green-600">Bandera:</strong>
          <img 
            src={country.flags.png} 
            alt={`Bandera de ${country.name.common}`} 
            className="w-full h-auto max-w-xs md:max-w-sm object-contain mb-4"
          />
        </div>
        <div className="w-full md:w-1/2 text-sm md:text-base">
          <strong className="text-green-600">Datos Generales:</strong>
          <p><strong>Nombre Oficial:</strong> {country.name.official}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Moneda(s):</strong> {
            country.currencies 
            ? Object.keys(country.currencies).map((currencyKey) => {
              const currency = country.currencies[currencyKey];
              return (
                <span key={currencyKey} className="block">
                  {currencyKey} - {currency.name} ({currency.symbol})
                </span>
              );
            })
            : 'No data'
          }</p>
          <p><strong>Continente:</strong> {country.region}</p>
          <p><strong>Subregión:</strong> {country.subregion}</p>
          <p><strong>País Independiente:</strong> {country.independent ? 'País independiente' : 'País No independiente'}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between md:ml-10 md:mr-10 gap-4 mt-4">
        <div className="w-full md:w-1/2">
          <strong className="text-green-600">Escudo:</strong>
          <img 
            src={country.coatOfArms.png} 
            alt={`Escudo de ${country.name.common}`} 
            className="w-full h-auto max-w-xs md:max-w-sm object-contain mb-4"
          />
        </div>
        <div className="w-full md:w-1/2 text-sm md:text-base">
          <strong className="text-green-600">Datos de terreno:</strong>
          <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
          <p><strong>Latitud y Longitud:</strong> {country.latlng.join(', ')}</p>
          <p><strong>Cercado de tierra:</strong> {country.landlocked ? 'Cercado por tierra' : 'No cercado por tierra'}</p>
          <div>
            <strong className="text-green-600">Otros Datos:</strong>
            <p><strong>Raíz:</strong> {country.idd.root}</p>
            <p><strong>Sufijo:</strong> {country.idd.suffixes ? country.idd.suffixes.join(', ') : 'N/A'}</p>
            <p><strong>Dominio:</strong> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
            <p><strong>Abreviación:</strong> {country.cca3}</p>
            <p><strong>Zona Horaria:</strong> {country.timezones.join(', ')}</p>
            <div>
              <strong>Lenguajes:</strong>
              {country.languages ? (
                <ul className="list-disc pl-5">
                  {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay información de lenguajes.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 md:ml-10 md:mr-10">
        <h2 className="text-2xl mb-2">Países Fronterizos:</h2>
        {country.borders && country.borders.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <Link key={border} href={`/country/${border}`} className="border p-2 m-1 rounded bg-gray-100 hover:bg-gray-200">
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