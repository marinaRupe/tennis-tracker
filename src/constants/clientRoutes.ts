export const matchesList = '/matches' as const;
export const matchOverview = (id: string) => `${matchesList}/${id}` as const;

export const playersList = '/' as const;
const players = '/players' as const;
export const playerOverview = (id: string) => `${players}/${id}` as const;
