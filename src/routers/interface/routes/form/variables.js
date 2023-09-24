import { makePath } from "functions";
import FormInstructions from "./tools/FormInstructions";

export const COLUMNS = {
  formName: {
    key: 'form_name',
    name: 'Form Name ',
    label: 'Form Name',
    align: 'center',
    colSize:'col-8',
    col:8,
    sortable: false,
    size: 'sm'
  },
  description: {
    key: 'form_description',
    name: 'Form Description',
    label: 'Form Description ',
    colSize:'col-8',
    col:8,
    sortable: false,
    size: 'lg'
  },
  instruction: {
    key: 'form_instructions_url',
    name: 'Instruction ',
    label: 'Instructions',
    colSize:'col-3',
    col:2,
    sortable: false,
    component:FormInstructions,
    size: 'md'
  }
};

export const ACTIONS = {
    view: {
      icon: {
        use: 'view',
        hover: 'view'
      },
      to: ({ form_link_url}) => makePath(form_link_url)
    }
  };