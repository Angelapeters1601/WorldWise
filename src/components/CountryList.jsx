import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map " />
    );

  //   const countries = cities.reduce((arr, city) => {
  //     if (!arr.map((el) => el.country).includes(city.country))
  //       return [...arr, { country: city.country, emoji: city.emoji }];
  //     else return arr;
  //   }, []);

  const countries = [];

  for (const city of cities) {
    const exists = countries.find((el) => el.country === city.country);

    if (!exists) {
      countries.push({ country: city.country, emoji: city.emoji });
    }
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
