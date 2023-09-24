import Form from './parts/Form';

// PARTS
import Body from './parts/Body';
import Col from './parts/Col';
import Group from './parts/Group';
import Label from './parts/Label';
import Row from './parts/Row';
import Text from './parts/Text';

// CONTROL COMPONENTS
import Control from './control/Control';
import Button from './control/parts/button/Button';
import Checkbox from './control/types/checklist/parts/Checkbox';
import Checklist from './control/types/checklist/Checklist';
import Date from './control/types/date/Date';
import Hidden from './control/types/Hidden';
import Items from './control/types/Items';
import Select from './control/types/select/Select';
import Textarea from './control/types/Textarea';
import Toggle from './control/types/toggle/Toggle';
import YesNo from './control/types/YesNo';
import Upload from './control/types/upload/Upload';
import MultipleChoice from './control/types/MultipleChoice';
import Area from './control/types/Area';

// PARTS
Form.Row       = Row;
Form.Col       = Col;
Form.Body      = Body;
Form.Label     = Label;
Form.Group     = Group;
Form.Text      = Text;

// CONTROL COMPONENTS
Form.Control   = Control;
Form.Hidden    = Hidden;
Form.Textarea  = Textarea;
Form.Checkbox  = Checkbox;
Form.Checklist = Checklist;
Form.Select    = Select;
Form.YesNo     = YesNo;
Form.Toggle    = Toggle;
Form.Date      = Date;
Form.Upload    = Upload;
Form.MultipleChoice  = MultipleChoice;
Form.Button    = Button;
Form.Items     = Items;
Form.Area      = Area;

// EXPORT
export default Form;
