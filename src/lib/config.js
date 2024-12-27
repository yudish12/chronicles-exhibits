export const headerRoutes = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/trade-show-booth-displays-designs",
    name: "Trade Show Display",
  },
  {
    link: "/custom-trade-show-booth-ideas",
    name: "Custom Booth",
  },
  {
    link: "/services",
    name: "Service",
  },
  {
    link: "/portfolio",
    name: "Portfolio",
  },
  {
    link: "/contact-us",
    name: "Contact Us",
  },
  {
    link: "/about-us",
    name: "About Us",
  },
];

export const boothsizePageFields = [
  {
    key: "top_title",
    type: "text",
    value: "",
  },
  {
    key: "top_btn_text",
    type: "text",
    value: "",
  },
  {
    key: "booth_size_title",
    type: "text",
    value: "",
  },
  {
    key: "booth_size_subtitle",
    type: "textarea",
    value: "",
  },
  {
    key: "second_title",
    type: "text",
    value: "",
  },
  {
    key: "second_subtitle",
    type: "textarea",
    value: "",
  },
  {
    key: "second_btn_text",
    type: "text",
    value: "",
  },
  {
    key: "third_title",
    type: "text",
    value: "",
  },
  {
    key: "third_body",
    type: "body",
    value: "<p>Hello</p>",
  },
];

export const homePageFields = [
  {
    key: "1st_section_h1",
    type: "text",
    value: "",
  },
  {
    key: "1st_section_gif",
    type: "upload",
    value: "",
  },
  {
    key: "1st_section_h2",
    type: "text",
    value: "",
  },
  {
    key: "1st_section_para",
    type: "text",
    value: "",
  },
  {
    key: "1st_section_btn",
    type: "button",
    value: "",
  },
  {
    key: "2nd_section_h6",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_h2",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_para",
    type: "textarea",
    value: "",
  },
  {
    key: "2nd_section_card_1_title",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_card_1_para",
    type: "textarea",
    value: "",
  },
  {
    key: "2nd_section_card_1_btn",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_card_2_title",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_card_2_para",
    type: "textarea",
    value: "",
  },
  {
    key: "2nd_section_card_2_btn",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_card_3_title",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_card_3_para",
    type: "textarea",
    value: "",
  },
  {
    key: "2nd_section_card_3_btn",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_h3",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_para",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_card_1_number",
    type: "number",
    value: "",
  },
  {
    key: "3rd_section_card_1_text",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_card_2_number",
    type: "number",
    value: "",
  },
  {
    key: "3rd_section_card_2_text",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_card_3_number",
    type: "number",
    value: "",
  },
  {
    key: "3rd_section_card_3_text",
    type: "text",
    value: "",
  },
  {
    key: "4th_section_h2",
    type: "text",
    value: "",
  },
  {
    key: "4th_section_body",
    type: "body",
    value: "",
  },
  {
    key: "4th_section_image",
    type: "upload",
    value: "",
  },
  {
    key: "5th_section_h3",
    type: "text",
    value: "",
  },
  {
    key: "5th_section_para",
    type: "textarea",
    value: "",
  },
  {
    key: "5th_section_faqs",
    type: "key-value-array",
    value: [
      {
        heading: "",
        text: "",
      },
    ],
  },
];

export const locationPageFields = [
  {
    key: "top_title",
    type: "text",
    value: "",
  },
  {
    key: "top_btn_text",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_first_h2",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_second_h2",
    type: "text",
    value: "",
  },
  {
    key: "2nd_section_first_para",
    type: "textarea",
    value: "",
  },
  {
    key: "2nd_section_second_para",
    type: "textarea",
    value: "",
  },
  {
    key: "3rd_section_image",
    type: "upload",
    value: "",
  },
  {
    key: "3rd_section_h2",
    type: "text",
    value: "",
  },
  {
    key: "3rd_section_body",
    type: "body",
    value: "",
  },
  {
    key: "last_section_body",
    type: "body",
    value: "",
  },
];

// db.pages.updateOne(
//   { name: "booth-size" },
//   {
//     $set: {
//       fields: [
//         {
//           key: "top_title",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "top_btn_text",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "booth_size_title",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "booth_size_subtitle",
//           type: "textarea",
//           value: "",
//         },
//         {
//           key: "second_title",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "second_subtitle",
//           type: "textarea",
//           value: "",
//         },
//         {
//           key: "second_btn_text",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "third_title",
//           type: "text",
//           value: "",
//         },
//         {
//           key: "third_body",
//           type: "body",
//           value: "<p>Hello</p>",
//         },
//       ],
//     },
//   }
// );
