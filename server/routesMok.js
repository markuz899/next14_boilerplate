const routes = [
  {
    path: "/",
    component: "Home",
    sections: [
      { sectionName: "sectionA" },
      { sectionName: "sectionB" },
      { sectionName: "sectionC" },
    ],
  },
  {
    path: "/contact",
    component: "Contact",
    sections: [{ sectionName: "sectionA" }, { sectionName: "sectionD" }],
  },
  {
    path: "/contact/:id",
    component: "ContactDetail",
    shield: true,
    sections: [{ sectionName: "sectionD" }, { sectionName: "sectionE" }],
  },
  {
    path: "/login",
    component: "Login",
    sections: [{ sectionName: "loginForm" }],
  },
  {
    path: "/components",
    component: "Components",
    sections: [
      { sectionName: "sectionA" },
      { sectionName: "sectionB" },
      { sectionName: "sectionC" },
    ],
  },
];

module.exports = routes;
