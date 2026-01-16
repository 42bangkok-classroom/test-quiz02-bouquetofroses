import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface ApiUser {
  id: number;
  name: string;
  phone: string;
  address?: Address;
}
interface UserResult {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

export async function getPostalAddress(): Promise<UserResult[]> {
  try {
    const response = await axios.get<ApiUser[]>("https://jsonplaceholder.typicode.com/users");
    const users = response.data;

    if (users.length === 0) {
      return [];
    }

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    }));
    
  } catch {
    return [];
  }
}



