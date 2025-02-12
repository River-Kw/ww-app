import prisma from "@/lib/prisma";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    // Make sure to include fields you'd like to use in metadata
    select: { name: true },
  });

  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfile({ params }: Props) {
  // Query the user data from the database
  // You can include whichever fields you want to display
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      name: true,
      bio: true,
      image: true,
      email: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const { name, bio, image, email } = user;

  return (
    <div>
      <h1>{name}</h1>

      <img
        width={300}
        src={image ?? "/mememan.webp"}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      <h3>Email</h3>
      {email ? <p>{email}</p> : <p>Email not available</p>}
    </div>
  );
}
