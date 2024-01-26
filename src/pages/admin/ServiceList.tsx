import { getServices } from "@/api/admin/service/service.api";
import { useQuery } from "@tanstack/react-query";

const ServiceList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  console.log({ isLoading, data, isError });

  if (isLoading) {
    return <h2>loading</h2>;
  }
  if (isError) {
    return <h2>something wrong</h2>;
  }
  return (
    <div>
      {data?.data?.map((item) => (
        <h1 key={item?.name}>{item?.name}</h1>
      ))}
    </div>
  );
};

export default ServiceList;
