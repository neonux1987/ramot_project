import React from 'react';
import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';

class ReactTableContainer extends React.Component {

  state = {

  };

  render() {
    return (
      <div className={styles.tableWrapper}>
        {this.props.headerControlsComponent}
        {this.props.editBox}
        <ReactTable {...this.props} />
      </div>
    );
  }

}

export default ReactTableContainer;