import { Route } from 'react-router';
import NotFound from './components/404';

export default (
    <Route path="*" component={NotFound} />
);