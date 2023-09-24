// FUNCTIONS

export const FETCH = {
  blacklist: ['undefined', 'dummy', 'confirmation'],
  useCSV:    false
}

export const LOGOUT = {
  useFetch: true
}


// FORMS

export const APPEND = {
  clearButton: {
    use: 'cancel'
  }
}
export const FORM_GROUP = {
  cols: {
    inline: {
      xs: 'auto'
    },
    columns: {
      xs: 24,
      md: 12,
      xl: 8
    },
    default: {
      xs: 24
    }
  }
}

export const LABEL = {
  cols: {
    above: {
      xs: 24
    },
    before: {
      xs: 24,
      sm: 'md'
    },
    inline: {
      xs: 'auto'
    },
    columns: {
      xs: 24,
      xl: 8
    }
  }
}

export const PREPEND = {
}

export const RICH_TEXT = {
  height: 600,
  plugins: 'lists link code',
  toolbar: 'undo redo | bold italic underline | bullist numlist | link code',
}

export const UPLOAD = {
  accept: 'application/pdf',
  multiple: false,
  useRecordID: false,
  allowDownload: true,
  allowDelete: false,
  variant: 'primary',
  fullWidth: true
}


// COMPONENTS

export const ALERT = {
  variant: 'highlight'
}

export const BUTTON = {
  variant:     'primary',
  spriteOrder: 2,
  spriteSize:  'sm',
  round:       false,
  // TYPES
  cancel: {
    variant: 'secondary',
    label:   'Cancel',
    icon:    'cancel-circle',
    outline: true
  },
  add: {
    label:   'Add',
    icon:    'add-circle'
  },
  submit: {
    label:   'Submit',
    icon:    'arrow-right'
  },
  save: {
    variant: 'success',
    label:   'Save',
    icon:    'save'
  },
  delete: {
    variant: 'danger',
    label:   'Delete',
    icon:    'trash'
  }
}

export const CALENDAR = {
  showOutsideMonth: false
}

export const CHECKLIST = {
  useCSV: false
}

export const DATE = {
  useOptions:       false,
  usePrecedingZero: true,
  yearLength:       2,
  fromPrepend:      'From:',
  toPrepend:        'To:'
}

export const DROPDOWN = {
  useArrow: true
}

export const LINK = {
  spriteOrder: 1
}

export const PLACEHOLDERS = {
  customSelect: 'Type or Select',
  input:        'Type Here',
  option:       'Option',
  select:       'Select',
  textarea:     'Type Here'
}

export const SPRITE = {
  size: 'sm'
}

export const TOGGLE = {
  useGroup: true
}

export const YES_NO = {
  useNumeric: true,
  useToggle: false
}
