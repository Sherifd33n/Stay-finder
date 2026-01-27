import Container from "@/components/Container";
import React from "react";
import ExploreCard from "../ExploreCard";

const page = () => {
  return (
    <Container>
      <div className="text-center mt-10">
        <p className="text-4xl text-[#111827] font-semibold font-serif">
          Discover Your{" "}
          <span className="text-[#089589] font-medium italic">Next Spaces</span>
        </p>
        <p className="text-[#6e7583] mt-4 mx-[20%]">
          Beyond the ordinary. Curated architectural gems and unique
          environments across the country, tailored for discerning eyes.
        </p>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <ExploreCard
              imageUrl="/images/house-2.jpg"
              title="Houses"
              text="Architectural residences and heritage family estate."
              href="/category/house"
              buttonText="Browse Houses"
            />

            <ExploreCard
              imageUrl="/images/apartment-2.jpg"
              title="Apartments"
              text="Sleek urban luxury lofts and penthouse in prime city hubs."
              href="/category/apartment"
              buttonText="View Collections"
            />

            <ExploreCard
              imageUrl="/images/hotel-2.jpg"
              title="Hotels"
              text="Curated boutique stays and ultra-luxe resort destinations."
              href="/category/hotel"
              buttonText="Explore Stays"
            />

            <ExploreCard
              imageUrl="/images/warehouse-2.jpg"
              title="Warehouses"
              text="Industrial conversion spaces for creative studios and storage."
              href="/category/warehouse"
              buttonText="Discover Spaces"
            />

            <ExploreCard
              imageUrl="/images/land-2.jpg"
              title="Lands"
              text="Unspoiled plots and development-ready canvases for vision."
              href="/category/land"
              buttonText="View Lands"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
