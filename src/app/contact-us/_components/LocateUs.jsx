import React from "react"

const LocateUs = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Locate Us On The Map</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Want to meet us? You are welcome at Chronicle&apos;s head office. Refer to the map below to find our location.
        </p>
        <div className="h-[400px] overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25775.73460659082!2d-115.276006!3d36.143021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c1edca3c4097%3A0x3d67c01115c86d20!2sChronicle%20Exhibits%20LLC%20%7C%20Trade%20Show%20Booth%20Rental%20Company!5e0!3m2!1sen!2sin!4v1735836505245!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default LocateUs

