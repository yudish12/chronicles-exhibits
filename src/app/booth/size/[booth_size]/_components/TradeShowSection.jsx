import React from "react";

const DiamondSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="16"
      height="16"
    >
      <polygon
        points="50,0 100,50 50,100 0,50"
        fill="#B0CB1F"
        stroke="#B0CB1F"
        strokeWidth="2"
      />
    </svg>
  );
};

const TradeShowSection = ({ size }) => {
  return (
    <div className="bg-[#FFF7F1] py-12 px-8 md:px-20 lg:px-32">
      {/* Section 1 */}
      <section className="py-10 text-secondary">
        <h2 className="text-2xl md:text-3xl font-bold heading-font text-secondary mb-4">
          FINEST QUALITY {size} TRADE SHOW DISPLAYS FOR IMPACTFUL BRAND PRESENCE
        </h2>
        <p className="text-gray-800  mb-6">
          While participating in a trade show, every business looks for stunning
          booth rentals that help it stand out from the crowd. It becomes a more
          challenging task for exhibitors who are new or have a low budget for
          exhibition endeavors. Chronicle Exhibits LLC. has the perfect solution
          for such needs i.e. {size} trade show booth rentals.
        </p>
        <p className="text-secondary mb-6">
          A {size} booth exhibit rental empowers your business to have an
          impactful presence on the trade show floor if you choose the best
          booth builder like us. Our experts ensure:
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 py-2 ">
            <DiamondSvg />
            <span>
              You gain the maximum advantage of the available space in terms of
              utility with the best aesthetics.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2">
            <DiamondSvg />
            <span>
              You get enough space to showcase your product or service and
              interact with your booth visitors.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2 ">
            <DiamondSvg />
            <span>
              You leave a positive impact on your target audience with our
              premium quality {size} trade show booth ideas.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2 ">
            <DiamondSvg />
            <span>
              You get the best value for your money invested through our
              extraordinary exhibition stands.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2 ">
            <DiamondSvg />
            <span>
              You accomplish your branding and marketing goals convincingly with
              our trade show booths.
            </span>
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="py-10 text-secondary ">
        <h2 className="text-2xl md:text-3xl font-bold heading-font text-secondary mb-4">
          FINEST QUALITY {size} TRADE SHOW DISPLAYS FOR IMPACTFUL BRAND PRESENCE
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Our proficient team follows a comprehensive approach to meet your{" "}
          {size} rental booth requirements. When you collaborate with us for
          {size} custom exhibit rentals, you gain an unbeatable edge over other
          exhibitors.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 py-2 ">
            <DiamondSvg />
            <span>
              We use astonishing fabric, eye-catching graphics, and appealing
              displays to give your {size} booth an elegant look.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2">
            <DiamondSvg />
            <span>
              Every business has its requirements and that is why we offer
              customized trade show booth rentals.
            </span>
          </li>
          <li className="flex items-center gap-2 py-2">
            <DiamondSvg />
            <span>
              We convert your brand essence and your vision into brilliant
              exhibit booth rentals to help you achieve your branding goals.
            </span>
          </li>
          <li className="flex items-center gap-2 text-secondary py-2 ">
            <DiamondSvg />
            <span>
              Our expert team and latest manufacturing capabilities allow us to
              attain excellent quality standards for every project.
            </span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="py-10">
        <h2 className="text-2xl md:text-3xl font-bold heading-font text-secondary mb-4">
          GET IN TOUCH WITH US FOR CREATIVE {size} TRADE SHOW BOOTH IDEAS
        </h2>
        <p className="text-gray-800 ">
          At Triumfo Inc., we believe in building long-lasting business
          relationships by building trust. Our experts always strive to provide
          impressive {size} trade show booth rentals at the best prices. We are
          just a few clicks away from making your business stand out at the next
          trade show with {size} trade show exhibit rentals that convert foot
          traffic into customers. Call us or send your query to us directly
          through our website now.
        </p>
      </section>
    </div>
  );
};

export default TradeShowSection;
