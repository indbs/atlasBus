import   React                              from 'react';
import                                           '../../style/bootstrap.min.css';
import { Field, 
         ErrorMessage }                     from 'formik';

export class InputComponent extends React.Component{
  render(){
    return(    
    <div className="form-group">
      <h7><label htmlFor={this.props.form_name}>{this.props.form_cyrName}</label></h7>
      <Field className={'form-control ' + (this.props.form_errors && this.props.form_touched ? ' is-invalid' : '')} form_type={this.props.text} name={this.props.form_name} />
      <ErrorMessage name={this.props.form_name} component="div" className="invalid-feedback" />
    </div>
    )
  }
}

export default InputComponent;