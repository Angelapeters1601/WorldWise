import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CITIES_LOADED":
      return { ...state, isLoading: false, cities: action.payload };
    case "CITY_LOADED":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "CITY_CREATED":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload, //makes new city the current
      };
    case "CITY_DELETED":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "REJECTED":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "CITIES_LOADED", payload: data });
      } catch {
        dispatch({
          type: "REJECTED",
          payload: "There was an error loading data...",
        });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return; //to convert to number, from Api id comes as string
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "CITY_LOADED", payload: data });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error loading cities...",
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "LOADING" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "CITY_CREATED", payload: data });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error creating city...",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "LOADING" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "CITY_DELETED", payload: id });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error deleting city...",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "CitiesContext is being used outside its scope - CitiesProvider!!!"
    );
  return context;
};

export { CitiesProvider, useCities };
