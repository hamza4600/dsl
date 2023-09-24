// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Alert from './parts/Alert';
import Router from './parts/Router';

// ALERT TYPES
Alert.Loading = ({
  message,
  ...props
}) => (
  <Alert
    {...props}
    message={(<>
      <Sprite.Loader />
      <span className="loading">{message}</span>
    </>)}
  />
)

// CHILD ASSIGNMENT
Alert.Router = Router;

// EXPORT
export default Alert;
