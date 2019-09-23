import   React                              from 'react';

export class DropDSelection extends React.Component{
  render(){
    return(
      <div className="form-group">
      <h6><label htmlFor={this.props.form_name}>{this.props.form_cyrName}</label></h6>
      <select 
        name={this.props.form_name} 
        onChange={this.props.onChange} 
        touched={this.props.touched} 
        className="form-control">
      {
        this.props.items.map(item =>{
          return <option key={item} value={item}>{item}</option>}
        )
      }
      </select>
    </div>    
    )
  }
}