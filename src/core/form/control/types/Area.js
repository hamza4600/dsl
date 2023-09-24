// DEPENDENCIES
import { compose } from 'redux';

// LOCAL HELPERS
import { formGroup } from '../helpers/layout/formGroup';
import { inputLabel } from '../helpers/layout/inputLabel';

// MAIN COMPONENT
const Area = compose(formGroup, inputLabel)(({ children }) => children);

// EXPORT
export default Area;
