import { getServices } from "@/api/admin/service/service.api";
import { useQuery } from "@tanstack/react-query";

const ServiceList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  if (isLoading) {
    return <h2>loading</h2>;
  }
  console.log({ isLoading, data });
  return (
    <div>
      {data.data.map((item) => (
        <h1 key={item.name}>{item.name}</h1>
      ))}
    </div>
  );
};

export default ServiceList;
