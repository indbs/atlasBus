import   React                                from "react";
import   DatePicker                           from "react-datepicker";
import { registerLocale }                     from  "react-datepicker";
import   ru                                   from 'date-fns/locale/ru';

registerLocale('ru', ru);

export const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      locale="ru"
      className='form-control'
      dateFormat='MM.dd.yyyy'
      dropdownMode="select"
      showMonthDropdown
      showYearDropdown
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

export class DPickerCompnnt extends React.Component{
  render(){
    return(
      <div className="form-group">
        <h6><label htmlFor={this.props.name}>{this.props.form_cyrName}</label></h6>
        <DatePickerField
          name      = {this.props.form_name}
          value     = {this.props.value}
          onChange  = {this.props.onChange}
        />
      </div>
    )
  }
}