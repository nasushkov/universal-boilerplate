import Route from 'react-router/lib/Route'
import Localizer from './localizer.jsx'

export default () => (
    <Route path="/:locale" component={Localizer}></Route>
)