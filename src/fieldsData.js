export default [
  {
    id: 1,
    name: "postcode",
    value: "",
    placeholder: "Type Postcode (required)",
    type: "number",
    elementType: "input"
  },
  {
    id: 2,
    name: "suburb",
    value: "",
    placeholder: "Type Suburb Name (required)",
    type: "text",
    elementType: "input"
  },
  {
    id: 3,
    name: "state",
    value: "",
    placeholder: "Choose State (required)",
    type: "text",
    elementType: "select",
    optionsArr: [
      { id: 1, label: "NSW" },
      { id: 2, label: "VIC" },
      { id: 3, label: "QLD" },
      { id: 4, label: "WA" },
      { id: 5, label: "NT" },
      { id: 6, label: "TAS" },
      { id: 7, label: "SA" }
    ]
  }
];
