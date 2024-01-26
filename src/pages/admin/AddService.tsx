import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");

  const { mutateAsync, isError, isSuccess } = useMutation({
    mutationFn: async (data) => {
      return await fetch("http://localhost:5000/api/v1/services", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  console.log(isError, isSuccess);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const serviceData = {
      name: serviceName,
      serviceImg: "streaming.jpg",
      description: "Unlimited access to a vast library of movies and TV shows",
      devices: ["Smart TV", "Tablet", "Mobile"],
      price: 15,
    };
    console.log(serviceData);
    await mutateAsync(serviceData);
    console.log("done");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setServiceName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddService;
