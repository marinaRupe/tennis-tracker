import React from 'react';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  matchesList,
  matchOverview,
  playersList,
  playerOverview,
} from '../constants/clientRoutes';
import MatchesList from '../pages/MatchesList';
import MatchOverview from '../pages/MatchOverview';
import PlayerOverview from '../pages/PlayerOverview';
import PlayersList from '../pages/PlayersList';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route
      path={playersList}
      element={<PlayersList />}
    />
    <Route
      path={matchesList}
      element={<MatchesList />}
    />
    <Route
      path={matchOverview(':matchId')}
      element={<MatchOverview />}
    />
    <Route
      path={playerOverview(':playerId')}
      element={<PlayerOverview />}
    />
  </Route>
));

export default router;
