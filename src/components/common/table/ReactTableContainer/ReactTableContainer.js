import React from 'react';
import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';
import LoadingCircle from '../../../common/LoadingCircle';
import classnames from 'classnames';

class ReactTableContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    const { settings = {} } = this.props;

    this.state = {
      sorted: [],
      defaultSorted: [],
      pageSize: undefined,
      expanded: {},
      resized: [],
      filtered: [],
      showPagination: settings && settings.showPagination === 1 ? true : false,
      resizable: settings && settings.resizable === 1 ? true : false,
      defaultPageSize: 65,
      minRows: settings && settings.minRows === 0 ? undefined : settings.minRows || undefined,
      filterable: false
    };

  }

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
        loading={this.props.loading}
        loadingText={"טוען..."}
        noDataText={"המידע לא נמצא"}
        LoadingComponent={LoadingCircle}
        manual
        {...this.state}
        data={this.props.data}
        columns={this.props.columns}
        pages={this.props.pages}
        onFetchData={this.props.onFetchData}
        defaultSorted={this.props.defaultSorted || this.state.defaultSorted}
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