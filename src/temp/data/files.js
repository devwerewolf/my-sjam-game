import { writable } from "svelte/store";

export const files = writable({
  "": {
    "home": {
      "outside": {},
      "upstairs": {
        "bedroom": {},
        "downstairs": {
          "@": ["", "home"]
        }
      },
      "kitchen": {}
    },
  }
});