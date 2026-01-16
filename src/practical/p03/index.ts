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

export async function filterUserById(id: number): Promise<UserResult | string> {
  try {
    const { data } = await axios.get<ApiUser[]>("https://jsonplaceholder.typicode.com/users");
    const user = data.find((u) => u.id === id);
    
    if (!user) {
      return "Invalid id";
    }

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    };
  } catch {
    return "Invalid id";
  }
}


