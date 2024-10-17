import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

//  you can rename the returned values when using this custom useUrlPosition
// hook in another component. JavaScript's destructuring allows
// you to assign any variable names you prefer when unpacking
//the returned array values.
// **************************************************
//if you export a value using an array, you should import it with array
// destructuring. Similarly, if you export using an object,
//you should import it with object destructuring.
//The structure you use for exporting and importing
// should match to properly access the values.
// useSearchParams is commonly destructured in arrays.
