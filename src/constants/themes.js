
import redcarpet from "/redcarpet.png";
import Scifi from "/scifi.png";
import outerspace from "/space.png";
import sports from "/sports.png";
import superheros from "/superheros.png";

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
    name: "Scifi",
    description: "Everyday casual wear for a relaxed look",
    thumbnail: "/themes/casual/thumbnail.jpg",
    image: Scifi,
    is_active: true,
    display_order: 2
  },
  {
    id: 3,
    name: "outerspace",
    description: "Elegant formal attire for special occasions",
    thumbnail: "/themes/formal/thumbnail.jpg",
    image: outerspace,
    is_active: true,
    display_order: 3
  },
  {
    id: 4,
    name: "sports",
    description: "Elegant formal attire for special occasions",
    thumbnail: "/themes/formal/thumbnail.jpg",
    image: sports,
    is_active: true,
    display_order: 3
  },
  {
    id: 5,
    name: "superheros",
    description: "Elegant formal attire for special occasions",
    thumbnail: "/themes/formal/thumbnail.jpg",
    image: superheros,
    is_active: true,
    display_order: 3
  }
];