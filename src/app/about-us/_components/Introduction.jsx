import React from "react";

const Introduction = ({ fields }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full">
      {/* Heading */}
      <h2 className="text-secondary text-3xl sm:text-4xl heading-font py-6 px-4 sm:px-0 text-center">
        A LEADING TRADE SHOW BOOTH DESIGN COMPANY IN USA
      </h2>

      {/* Subtitle */}
      <div className="py-2 text-sm text-center px-4 sm:px-0">
        We&apos;ve been creating unique rental exhibits to promote your brand
        for more than Two decades!
      </div>

      {/* Section: Who We Are */}
      <div className="text-secondary heading-font mt-10 mb-6 text-2xl sm:text-3xl text-center px-4 sm:px-0">
        <h2>WHO WE ARE</h2>
      </div>
      <div className="text-secondary text-center px-6 sm:px-12 text-sm sm:text-base">
        <p className="py-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi unde ea
          vel voluptatem maiores cumque sint aperiam. Porro ut omnis iure
          praesentium nesciunt est aut voluptatem quae. Reiciendis quos
          repellendus vel voluptatibus quia nesciunt iusto impedit at suscipit
          molestiae sed veniam, quibusdam officia aut ratione aliquam corrupti
          illo ad accusantium a fuga reprehenderit sint repellat voluptatem!
          Inventore exercitationem facere alias at.
        </p>
        <p className="py-4">
          Dignissimos molestiae blanditiis officia repellendus dolor. Ea,
          ratione sequi officiis harum aspernatur qui iste maxime adipisci dicta
          minus deleniti molestiae in, perferendis praesentium, corrupti ipsum
          omnis? Reiciendis, nam, officiis expedita voluptates voluptatibus
          tempora quibusdam, minima modi sit reprehenderit distinctio? Beatae
          nam quisquam architecto tempora at odit magnam, nulla sed consequatur
          dicta, ut laudantium ipsum ex, molestiae ratione quas doloremque
          quibusdam eveniet.
        </p>
      </div>

      {/* Section: Our Beliefs */}
      <div className="text-secondary heading-font mt-10 mb-6 text-2xl sm:text-3xl text-center px-4 sm:px-0">
        <h2>OUR BELIEFS</h2>
      </div>
      <div className="text-secondary text-center px-6 sm:px-12 text-sm sm:text-base">
        <p className="py-4">
          Dignissimos molestiae blanditiis officia repellendus dolor. Ea,
          ratione sequi officiis harum aspernatur qui iste maxime adipisci dicta
          minus deleniti molestiae in, perferendis praesentium, corrupti ipsum
          omnis? Reiciendis, nam, officiis expedita voluptates voluptatibus
          tempora quibusdam, minima modi sit reprehenderit distinctio? Beatae
          nam quisquam architecto tempora at odit magnam, nulla sed consequatur
          dicta, ut laudantium ipsum ex, molestiae ratione quas doloremque
          quibusdam eveniet.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
