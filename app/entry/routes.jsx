import { Route } from 'react-router';
import { browserHistory } from 'react-router';
import ReactRouterSSR from 'react-router-ssr';
import publicRoutes from 'modules/PublicPages/client/routes';
import dashboardRoutes from 'modules/Dashboard/client/routes';
import errorRoutes from 'modules/Error/client/routes';
import authenticationRoutes from 'modules/Authentication/client/routes';
import App from 'modules/Core/client/components/App';
import AppLayout from 'modules/Core/client/containers/AppLayout';

ReactRouterSSR.Run(
    <Route history={browserHistory} component={App}>
        {publicRoutes}
        {authenticationRoutes}
        <Route component={AppLayout}>
            {dashboardRoutes}
            {errorRoutes}
        </Route>
    </Route>
);