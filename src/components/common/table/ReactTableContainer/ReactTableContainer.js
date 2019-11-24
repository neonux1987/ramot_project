import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import styles from './ReactTableContainer.module.css';
import LoadingCircle from '../../../common/LoadingCircle';
import classnames from 'classnames';
import Spinner from '../../Spinner/Spinner';

import {
  fetchTableSettings,
  tableSettingsCleanup,
  initTableSettings
} from '../../../../redux/actions/tableSettingsActions';

class ReactTableContainer extends React.PureComponent {

  // STATE
  state = {
    sorted: [],
    defaultSorted: [],
    pageSize: 100,
    expanded: {},
    resized: [],
    filtered: [],
    showPagination: true,
    resizable: true,
    defaultPageSize: 65,
    minRows: 20,
    pages: 0
  };

  // VARS
  settingsLoaded = false;

  componentDidMount() {
    this.props.initTableSettings(this.props.pageNameSettings).then(() => {
      this.props.fetchTableSettings(this.props.pageNameSettings).then((settings) => {
        this.setState(() => {
          this.settingsLoaded = true
          return {
            pageSize: settings.pageSize,
            showPagination: true,
            resizable: settings.resizable === 1 ? true : false,
            defaultPageSize: settings.defaultPageSize,
            minRows: settings.minRows,
            filterable: false
          }
        });
      });// end fetchTableSettings
    });// end initTableSettings
  }

  componentWillUnmount() {
    this.props.tableSettingsCleanup();
    this.settingsLoaded = false;
  }

  onFetchDataCallback = (state) => {
    this.props.onFetchData(state, this.props.dataCount);
  }

  render() {

    const pageName = this.props.pageNameSettings;

    // table settings
    const tableSettings = this.props.tableSettings.pages[pageName];

    if (tableSettings === undefined || tableSettings.isFetching || !this.settingsLoaded) {
      return <Spinner wrapperClass={styles.spinner} size={60} loadingText={"טוען הגדרות טבלה..."} />
    }
    console.log(this.state);
    const pages = this.state.pageSize != 0 ? Math.ceil(this.props.dataCount / this.state.pageSize) : 0;

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
        defaultSorted={this.props.defaultSorted}
        {...this.state}
        data={this.props.data}
        columns={this.props.columns}
        onFetchData={this.onFetchDataCallback}
        pages={pages}
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
  filterable: false,
  pageNameSettings: ""
}

const mapStateToProps = state => ({
  tableSettings: state.tableSettings
});

const mapDispatchToProps = dispatch => ({
  fetchTableSettings: (pageName) => dispatch(fetchTableSettings(pageName)),
  tableSettingsCleanup: (pageName) => dispatch(tableSettingsCleanup(pageName)),
  initTableSettings: (pageName) => dispatch(initTableSettings(pageName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTableContainer);