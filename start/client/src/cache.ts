import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches: Reference[] = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});

// Define two reactive variables, one for each of our client-side schema fields.
// The value we provide to each makeVar call sets the variable's initial value.
// The values of isLoggedInVar and cartItemsVar are functions.
// If you call a reactive variable function with zero arguments (e.g., isLoggedInVar()),
// it returns the variable's current value. If you call the function with one argument,
// it replaces the variable's current value with the provided value.

// Initializes to true if localStorage includes a 'token' key, otherwise false.
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));

// Initializes to an empty array
export const cartItemsVar = makeVar<string[]>([]);
