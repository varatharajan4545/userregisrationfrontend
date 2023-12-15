import SearchInput from './Searchinput';
import Textarea from './TextArea';
import TextInput from './TextInput';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <TextInput {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'search':
      return <SearchInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
