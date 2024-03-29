import fs from "fs";

const usersPath = "../../data/users.json";

// Function to get user data from the JSON file
const getUsers = () => {
  try {
    const usersData = fs.readFileSync(usersPath, "utf8");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error reading user data:", error);
    return [];
  }
};

// eslint-disable-next-line no-undef
export default getUsers;
