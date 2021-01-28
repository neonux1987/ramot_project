import React from 'react';
import EditableColumn from '../components/table/TableCell/EditableColumn';

const withTableLogic = (OriginalComponent) => {

  return class WithTableLogic extends React.Component {

    state = {
      editMode: false,
      addNewMode: false,
    };

    toggleEditMode = () => {

      this.setState({
        editMode: !this.state.editMode
      });
    };

    toggleAddNewMode = () => {

      this.setState({
        addNewMode: !this.state.addNewMode
      });
    };

    inputOnFocusHandler = (e) => {
      e.target.select();
    };

    editableDivOnFocusHandler = (e) => {
      var range = document.createRange();
      range.selectNodeContents(e.target);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };

    onKeyPressHandler = (e) => {
      if (e.key === "Enter") {
        e.target.blur();
      }
    };

    textAreaInput = (key, value, index, onBlurHandler) => {
      return <EditableColumn
        value={value}
        type="textarea"
        key={key}
        dataKey={key}
        dataIndex={index}
        onBlurHandler={onBlurHandler}
        onFocusHandler={this.editableDivOnFocusHandler}
      />
    };

    textInput = (key, value, index, onBlurHandler) => {
      return <EditableColumn
        value={value}
        type="text"
        key={key}
        dataKey={key}
        dataIndex={index}
        onBlurHandler={onBlurHandler}
        onKeyPressHandler={this.onKeyPressHandler}
        onFocusHandler={this.inputOnFocusHandler}
      />
    };

    numberInput = (key, value, index, onBlurHandler) => {
      const newValue = value === 0 ? "" : value;
      return <EditableColumn
        type="number"
        key={key}
        dataKey={key}
        dataIndex={index}
        value={newValue}
        onBlurHandler={onBlurHandler}
        onKeyPressHandler={this.onKeyPressHandler}
        onFocusHandler={this.inputOnFocusHandler}
      />
    };

    render() {
      return <OriginalComponent
        {...this.props}
        toggleEditMode={this.toggleEditMode}
        editMode={this.state.editMode}
        toggleAddNewMode={this.toggleAddNewMode}
        addNewMode={this.state.addNewMode}
        inputOnFocusHandler={this.inputOnFocusHandler}
        editableDivOnFocusHandler={this.editableDivOnFocusHandler}
        onKeyPressHandler={this.onKeyPressHandler}
        textAreaInput={this.textAreaInput}
        numberInput={this.numberInput}
        textInput={this.textInput}
      />;
    }

  }
}

export default withTableLogic;