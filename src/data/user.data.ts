import { generateUniqueEmail } from "../utils/get-user.utils.ts";

export const newUser = {
  email: generateUniqueEmail(),
  password: "shadowFax123!",
  firstName: "Christofer",
  lastName: "Hopkins",
  dob: "1990-01-01",
  street: "123 Main St",
  postalCode: "12345",
  city: "Anytown",
  state: "CA",
  country: "Mexico",
  phone: "1234567890",
};

export const updateUserInfo = {
  name: 'Christopher',
  lastName: 'Hoppkins',
  phone: '9876543210'
};
