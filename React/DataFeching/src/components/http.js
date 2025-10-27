export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch places.");
  }
  return resData.places;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places");
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error("Could not fetch User places.");
    }
    return resData.places;
  }

export async function updateUserPlaces(places) {
  const respose = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  const resData = await respose.json();
  if (!respose.ok) {
    throw new Error("Could not update user places.");
  }

  return resData.message;
}
