import React from 'react';
import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';
import LoadingCircle from '../../../common/LoadingCircle';
import classnames from 'classnames';
import Spinner from '../../Spinner/Spinner';

class ReactTableContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    const { settings = {} } = this.props;

    this.state = {
      tableSettings: {
        sorted: [],
        defaultSorted: this.props.defaultSorted || [],
        pageSize: settings && settings.pageSize === undefined ? 50 : settings.pageSize,
        expanded: {},
        resized: [],
        filtered: [],
        showPagination: true,
        resizable: settings && settings.resizable === 1 ? true : false,
        defaultPageSize: settings && settings.defaultPageSize === undefined ? 65 : settings.defaultPageSize,
        minRows: settings && settings.minRows === undefined ? undefined : settings.minRows,
        filterable: false,
        manual: this.props.manual
      },
      settingsLoaded: false
    };

  }

  componentDidMount() {

  }

  render() {
    if (this.props.loadingSettings || this.state.settingsLoaded) {
      return <Spinner wrapperClass={styles.spinner} size={60} loadingText={"טוען הגדרות טבלה..."} />
    }
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

        {...this.state.tableSettings}
        data={this.props.data}
        columns={this.props.columns}
        onFetchData={this.props.onFetchData}
        pages={this.props.pages || 0}
        manual
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
  defaultPageSize: 65,
  minRows: undefined,
  filterable: false
}

export default ReactTableContainer;