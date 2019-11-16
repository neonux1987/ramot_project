import React from 'react';
import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';
import LoadingCircle from '../../../common/LoadingCircle';
import classnames from 'classnames';

class ReactTableContainer extends React.PureComponent {

  state = {
    sorted: this.props.sorted,
    defaultSorted: this.props.defaultSorted,
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
      <ReactTableMemoized
        id={"react-table"}
        className={classnames(styles.table, "-highlight")}
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
    );
  }

}

// memoize react table
const ReactTableMemoized = React.memo((props) => <ReactTable {...props} />);

ReactTableContainer.defaultProps = {
  sorted: [],
  defaultSorted: [],
  pageSize: undefined,
  expanded: {},
  resized: [],
  filtered: [],
  showPagination: true,
  resizable: false,
  defaultPageSize: 40,
  minRows: undefined,
  filterable: false
}

export default ReactTableContainer;