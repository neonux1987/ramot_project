// TYPES
export const TYPES = {
  ROUTES_UPDATE: "ROUTES_UPDATE"
}

export const updateRoute = (active) => {
  return {
    type: TYPES.ROUTES_UPDATE,
    active
  };
}

