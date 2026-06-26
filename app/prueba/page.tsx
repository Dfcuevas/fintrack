import { getOrCreateUser } from "@/lib/getOrCreateUser";

const page = async () => {
  const user = await getOrCreateUser();
  console.log(user);
  return (
    <div>
      <h1>Hola</h1>
    </div>
  );
};

export default page;
