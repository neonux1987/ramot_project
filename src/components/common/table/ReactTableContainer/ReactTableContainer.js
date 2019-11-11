import React from 'react';
import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';
import LoadingCircle from '../../../common/LoadingCircle';

class ReactTableContainer extends React.Component {

  state = {
    sorted: this.props.sorted,
    defaultSorted: this.props.defaultSorted,
    page: this.props.page,
    pageSize: this.props.pageSize,
    expanded: this.props.expanded,
    resized: this.props.resized,
    filtered: this.props.filtered,
    showPagination: this.props.showPagination,
    resizable: this.props.resizable,
    defaultPageSize: this.props.defaultPageSize,
    minRows: this.props.minRows,
    filterable: this.props.filterable
  };

  render() {
    return (
      <div className={styles.tableWrapper}>
        {this.props.headerControlsComponent}
        {this.props.editBox}
        <ReactTable
          id={"react-table"}
          className="-highlight"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            //height: "750px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay",
                height: "630px"
              }
            }
          }}
          getTheadFilterThProps={() => {
            return {
              style: {
                background: "#ebeef1"
              }
            }
          }}
          loadingText={"טוען..."}
          noDataText={"המידע לא נמצא"}
          LoadingComponent={LoadingCircle}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }

}

ReactTableContainer.defaultProps = {
  sorted: [],
  defaultSorted: [],
  page: 0,
  pageSize: undefined,
  expanded: {},
  resized: [],
  filtered: [],
  showPagination: true,
  resizable: false,
  defaultPageSize: 50,
  minRows: undefined,
  filterable: false
}

export default ReactTableContainer;