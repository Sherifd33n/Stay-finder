import { PiHouseFill } from "react-icons/pi";
import QuantityInput from "../QuantityInput";

interface StepFourProps {
  active: "rent" | "sell";
  details: {
    price: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
  };
  setDetails: React.Dispatch<
    React.SetStateAction<{
      price: string;
      area: string;
      bedrooms: number;
      bathrooms: number;
      description: string;
    }>
  >;
}

function StepFour({ active, details, setDetails }: StepFourProps) {
  return (
    <div className="">
      <div className="flex justify-between gap-8">
        <div className="border-gray-200">
          <h2 className="mb-1 text-xl font-semibold text-[#101418]">
            Property Details & Pricing
          </h2>
          <p className="text-sm text-[#818891]">
            Provide the specifics that helps potential buyers or tenants to
            understand your listing.
          </p>
        </div>

        <div>
          <div className="inline-flex gap-2 items-center text-[#089589] bg-[#e7f2fd] border border-[#a9d4d1] rounded-md px-2 py-1 text-sm">
            <PiHouseFill size={13} /> RESIDENTIAL
          </div>
        </div>
      </div>
      <div className="pb-6 mt-5 flex items-center gap-4">
        <div className="">
          <p className="text-[#0e0e0e] text-lg mb-2">Listing Price</p>
          <div className="inline-flex items-center gap-2 text-[17px] text-[#506b82] bg-[#f3f4f6] px-3 py-2 rounded w-full">
            <p>$</p>
            <input
              type="text"
              placeholder="0.00"
              value={details.price}
              onChange={(e) =>
                setDetails((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              className="outline-none text-[#40617c] w-full"
            />

            {active === "rent" && <p>/mo</p>}
          </div>
        </div>
        <div className="">
          <p className="text-[#0e0e0e] text-lg mb-2">Total Area</p>
          <div className="inline-flex items-center gap-2 text-[17px] text-[#506b82] bg-[#f3f4f6] px-3 py-2 rounded w-full">
            <input
              type="text"
              placeholder="Enter Size"
              value={details.area}
              onChange={(e) =>
                setDetails((prev) => ({
                  ...prev,
                  area: e.target.value,
                }))
              }
              className="outline-none text-[#40617c] w-full"
            />

            <p>/sqft</p>
          </div>
        </div>
      </div>
      <div className="pb-6 mt-5 flex items-center gap-4 w-full pr-8">
        <div className="w-full">
          <p className="text-[#0e0e0e] text-lg mb-2">Bedrooms</p>
          <QuantityInput
            min={1}
            max={20}
            value={details.bedrooms}
            onChange={(value) =>
              setDetails((prev) => ({
                ...prev,
                bedrooms: value,
              }))
            }
          />
        </div>
        <div className="w-full">
          <p className="text-[#0e0e0e] text-lg mb-2">Bathrooms</p>
          <QuantityInput
            min={1}
            max={20}
            value={details.bathrooms}
            onChange={(value) =>
              setDetails((prev) => ({
                ...prev,
                bathrooms: value,
              }))
            }
          />
        </div>
      </div>{" "}
      <div className="">
        <p className="text-[#0e0e0e] text-lg mb-2">Property Description</p>
        <div className="block items-center gap-2 text-[17px] text-[#506b82] bg-[#f3f4f6] px-3 py-2 rounded w-full">
          <textarea
            placeholder="Tell potential buyers about the unique features, amenities, recent renovations and neighborhood vibes of your property..."
            value={details.description}
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="outline-none text-[#40617c] w-full h-32 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
export default StepFour;
