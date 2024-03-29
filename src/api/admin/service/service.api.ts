import axios from "axios";

//  fetching using axios

// export const getServices = async () => {
//   return await axios.get("http://localhost:5000/api/v1/services");
// };

// manually fetching using fetch
// export const getServices = async () => {
//     const res = await fetch("http://localhost:5000/api/v1/servicesj").then(
//       (res) => res.json()
//     );

//     if (!res.success) {
//       throw new Error("something went wrong");
//     }
//     return res;
//   };

export const getServices = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
};
