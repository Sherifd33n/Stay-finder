"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import { agents } from "@/data/listing";
import { IoMdArrowBack } from "react-icons/io";

export default function AgentProfilePage() {
  const router = useRouter();
  const params = useParams();

  const agent = agents.find((a) => a.id === params.id);

  if (!agent) {
    return <p className="text-center mt-10">Agent not found</p>;
  }

  return (
    <Container className="mx-auto py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600"
      >
        <IoMdArrowBack /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-72 w-full">
          <Image
            src={agent.image[0]}
            alt={agent.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{agent.name}</h1>
          <p className="text-gray-500">{agent.businessName}</p>

          <p className="mt-4">{agent.about}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Location:</strong> {agent.location}</p>
            <p><strong>Experience:</strong> {agent.experience} years</p>
            <p><strong>Listings:</strong> {agent.listings}</p>
            <p><strong>Phone:</strong> {agent.phone}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {agent.specialty.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
