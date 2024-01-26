import { useGetServices } from "@/api/admin/service/service.hook";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";

const ServiceList = () => {
  const [serviceName, setServiceName] = useState("");

  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isError: postError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data) => {
      return await fetch("http://localhost:5000/api/v1/services", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  console.log(postError, isSuccess);

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

  const { data: services, isLoading, isError } = useGetServices();

  // const {
  //   data: services,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["services"],
  //   queryFn: getServices,
  //   select: (data) => {
  //     const services = data.data.map((item) => ({
  //       id: item._id,
  //       name: item.name,
  //       description: item.description,
  //       price: item.price,
  //     }));
  //     return services;
  //   },
  // });

  // console.log({ isLoading, data, isError });

  if (isLoading) {
    return <h2>loading</h2>;
  }
  if (isError) {
    return <h2>something wrong</h2>;
  }

  return (
    <Container className="mt-20 border p-0 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" className="p-2">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total services</TableCell>
            <TableCell className="text-right">{services.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setServiceName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};

export default ServiceList;
