export const root = [
  {title: "", directories: [
    {title: "home", directories: [
      {title: "upstairs", directories: [
        {title: "bedroom", items: ["doll"], invalid: true},
        {title: "downstairs", shortcut: "/home"},
        {title: "trap_door", hidden: true, invalid: true, directories: [
          {title: "basement"}
        ]}
      ]},
      {title: "kitchen"},
      {title: "outside"},
    ]}
  ]}
]