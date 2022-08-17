// LIBRARIES
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ACTIONS
import {
  expansesCodesCleanup,
  fetchExpansesCodesByStatus
} from "../../../redux/actions/expansesCodesActions";
import {
  fetchSummarizedSections,
  summarizedSectionsCleanup
} from "../../../redux/actions/summarizedSectionsActions";
import { addMonthExpanse } from "../../../redux/actions/monthExpansesActions";

// TOASTS
import { toastManager } from "../../../toasts/toastManager";

// COMPONENTS
import AddExpanse from "./AddExpanse";

let keys = {
  0: "code",
  1: "codeName",
  2: "section",
  3: "supplierName",
  4: "sum",
  5: "notes",
  6: "submit"
};

const AddExpanseContainer = ({ buildingId, show, tax, date }) => {
  const [formInputs, setFormInputs] = useState({
    code: null,
    codeName: null,
    summarized_section_id: "",
    section: "",
    supplierName: "",
    sum: "",
    notes: ""
  });
  const supplierInputRef = useRef();

  const summarizedSections = useSelector((store) => store.summarizedSections);
  const expansesCodes = useSelector((store) => store.expansesCodes);

  const dispatch = useDispatch();

  const submitData = async () => {
    const valid = validateFormInputs(formInputs);
    if (!valid) {
      // send the error to the notification center
      toastManager.error("קוד או שם חשבון לא יכולים להיות ריקים");
      return;
    }

    if (date.year === undefined) {
      // send the error to the notification center
      toastManager.error("לא ניתן להוסיף שורה לדוח ריק");
      return;
    }

    const copiedFormInputs = { ...formInputs };
    copiedFormInputs.code = copiedFormInputs.code.code;
    copiedFormInputs.codeName = copiedFormInputs.codeName.codeName;
    copiedFormInputs.expanses_code_id = formInputs.code.id;
    copiedFormInputs.year = date.year;
    copiedFormInputs.month = date.month;
    copiedFormInputs.tax = tax;

    //parse form inputs
    const parsedFormInputs = parseFormInputs(copiedFormInputs);

    const params = {
      buildingId,
      expanse: parsedFormInputs,
      date: date
    };

    dispatch(addMonthExpanse(params, params.expanse)).then(() => {
      reset();
    });
  };

  const validateFormInputs = (formInputs) => {
    if (!formInputs.code && !formInputs.codeName) {
      return false;
    }
    return true;
  };

  const parseFormInputs = (formInputs) => {
    // tax data
    //const tax = generalSettings.data[0].tax;

    const copyFormInputs = { ...formInputs };
    //parse inputs
    copyFormInputs.code = Number.parseInt(copyFormInputs.code);
    copyFormInputs.sum =
      copyFormInputs.sum === "" ? 0 : Number.parseFloat(copyFormInputs.sum);
    copyFormInputs.summarized_section_id = Number.parseInt(
      copyFormInputs.summarized_section_id
    );
    copyFormInputs.year = Number.parseInt(formInputs.year);
    copyFormInputs.tax = Number.parseFloat(formInputs.tax);

    return copyFormInputs;
  };

  const reactSelectHandleChange = (selectedOption) => {
    setFormInputs(() => {
      const result = {
        ...formInputs,
        code: selectedOption,
        codeName: selectedOption
      };

      //find the section filld in the data
      //and fill the input if section exist
      let summarizedSection = findSection(selectedOption);

      if (summarizedSection === undefined) {
        summarizedSection = {
          section: "סעיף מסכם לא קיים"
        };
      }

      if (summarizedSection) {
        result.section = summarizedSection.section;
        result.summarized_section_id = summarizedSection.id;
      }

      return result;
    });
  };

  const onMenuCloseHandler = () => {
    supplierInputRef.current.focus();
  };

  const findSection = (code) => {
    const { data } = summarizedSections;

    return data.find((section) => {
      return section.id === code.summarized_section_id;
    });
  };

  const formChangeHandler = (event) => {
    let target = event.target;
    setFormInputs({
      ...formInputs,
      [target.name]: target.value
    });
  };

  const reset = () => {
    keys[2] = "section";

    setFormInputs({
      code: null,
      codeName: null,
      summarized_section_id: "",
      section: "",
      supplierName: "",
      sum: "",
      notes: ""
    });
  };

  const submit = () => {
    if (formInputs.section === "סעיף מסכם לא קיים")
      // send the error to the notification center
      toastManager.error(`הוספת שורה נכשלה. 
      קוד הנהלת חשבונות מקושר לסעיף מסכם שלא קיים. 
      נא צור את הסעיף בטבלת ניהול סעיפים מסכמים או קשר לסעיף אחר בטבלת ניהול ומעקב קודי הנהלת חשבונות`);
    else submitData(formInputs, reset);
  };

  useEffect(() => {
    dispatch(fetchExpansesCodesByStatus("active"));
    dispatch(fetchSummarizedSections("active"));

    return () => {
      dispatch(summarizedSectionsCleanup());
      dispatch(expansesCodesCleanup());
    };
  }, [dispatch]);

  return (
    <AddExpanse
      expansesCodes={expansesCodes}
      summarizedSections={summarizedSections}
      formInputs={formInputs}
      show={show}
      formChangeHandler={formChangeHandler}
      onMenuCloseHandler={onMenuCloseHandler}
      reset={reset}
      supplierInputRef={supplierInputRef}
      submit={submit}
      reactSelectHandleChange={reactSelectHandleChange}
    />
  );
};

export default React.memo(AddExpanseContainer);
