import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const DashboardHeader = async ({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) => {
  const user = await currentUser();
  return (
    <header className="flex items-center justify-between py-4 px-6">
      <h1 className="text-primary font-semibold text-2xl">{title}</h1>
      <div className="flex items-center gap-4">
        <Image src="/notification-icon.svg" alt="" width={16} height={20} />
        {action}
        {user?.imageUrl && (
          <Image
            src={user?.imageUrl}
            alt={user.fullName ?? "Avatar"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
