// TYPES
export const TYPES = {
  ROUTES_UPDATE: "ROUTES_UPDATE"
}

export const updateDate = (active) => {
  return {
    type: TYPES.ROUTES_UPDATE,
    active
  };
}

