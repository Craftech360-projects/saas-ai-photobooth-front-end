import redcarpet from "/redcarpet.png";

// export const THEMES = [
//   { id: 1, name: "Red Carpet", image: redcarpet },
//   { id: 2, name: "Space", image: outerspace },
//   { id: 3, name: "Sci-fi", image: Scifi },
//   { id: 4, name: "Sports", image: sports },
//   { id: 5, name: "Superheros", image: superheros },
// ];

export const THEMES = [
  {
    id: 1,
    name: "Red Carpet",
    description: "Professional business attire for corporate settings",
    image: redcarpet,
    thumbnail: "/themes/business/thumbnail.jpg",
    is_active: true,
    display_order: 1
  },
  {
    id: 2,
    name: "Casual",
    description: "Everyday casual wear for a relaxed look",
    thumbnail: "/themes/casual/thumbnail.jpg",
    is_active: true,
    display_order: 2
  },
  {
    id: 3,
    name: "Formal",
    description: "Elegant formal attire for special occasions",
    thumbnail: "/themes/formal/thumbnail.jpg",
    is_active: true,
    display_order: 3
  }
];