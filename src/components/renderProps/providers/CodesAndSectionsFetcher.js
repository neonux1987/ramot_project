import React from 'react';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../redux/actions/expansesCodesActions';

class CodesAndSectionsFetcher extends React.Component {

  componentDidMount() {

    if (this.props.fetchCodes) {
      // fetch expnases codes
      this.props.fetchExpansesCodes();
    }

    if (this.props.fetchSections) {
      // fetch summarized sections
      this.props.fetchSummarizedSections();
    }

  }

  componentWillUnmount() {
    //cleanup
    this.props.summarizedSectionsCleanup();
    this.props.expansesCodesCleanup();
  }

  render() {
    const { expansesCodes } = this.props.expansesCodes;
    const { summarizedSections } = this.props.summarizedSections;

    return this.props.children({
      codes: expansesCodes,
      sections: summarizedSections
    });
  }

}

const mapStateToProps = state => ({
  summarizedSections: state.summarizedSections,
  expansesCodes: state.expansesCodes
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodes: () => dispatch(expansesCodesActions.fetchExpansesCodes()),
  expansesCodesCleanup: () => dispatch(expansesCodesActions.expansesCodesCleanup()),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  summarizedSectionsCleanup: () => dispatch(summarizedSectionsActions.summarizedSectionsCleanup()),
});

CodesAndSectionsFetcher.defaultProps = {
  fetchCodes: false,
  fetchSections: false
}

export default connect(mapStateToProps, mapDispatchToProps)(CodesAndSectionsFetcher);