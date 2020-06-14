import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles, {
  container,
  upper,
  titleWrapper,
  titleText,
  chartWrapper,
  chart,
  bottom,
  right,
  incomeWrapper,
  incomeText,
  incomeDescription,
  outcomeWrapper,
  outcomeText,
  outcomeDescription,
  left,
  differenceWrapper,
  differenceText,
  differenceDescription
} from './StatBox.module.css';
import Spinner from '../../Spinner/Spinner';
import { PieChart } from 'react-minimal-pie-chart';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';

export default ({ title, income, outcome, unicodeSymbol, titleColor = "#000000", loading = true }) => {

  if (loading)
    return <AlignCenterMiddle style={{ height: "200px" }}><Spinner style={{ fontWeight: 600 }} loadingText={`טוען נתוני ${title}`} size={20} /></AlignCenterMiddle>


  return <div className={container}>
    <div className={upper}>

      <div className={titleWrapper}>
        <Typography variant="h6" className={titleText} style={{ color: titleColor }} gutterBottom>
          {title}
        </Typography>
      </div>

      <div className={chartWrapper}>
        <PieChart
          className={chart}
          paddingAngle={5}
          lineWidth={20}
          totalValue={income + outcome}
          data={[
            { title: 'outcome', value: outcome, color: '#ff5555' },
            { title: 'income', value: income, color: '#29d4a1' },
          ]}
        />
      </div>

    </div>

    <div className={bottom}>

      <div className={right}>

        <div className={incomeWrapper}>
          <span className={incomeText} style={{ color: "rgb(26, 177, 132)" }}>
            {income} {unicodeSymbol}
          </span>
          <span className={incomeDescription}>
            הכנסות
            </span>
        </div>

        <div className={outcomeWrapper}>
          <div className={outcomeText} style={{ color: "rgb(255, 69, 69)" }}>
            {outcome} {unicodeSymbol}
          </div>
          <div className={outcomeDescription}>
            הוצאות
              </div>
        </div>

      </div>

      <div className={left}>

        <div className={differenceWrapper}>
          <span className={differenceText} style={{ color: "rgb(48, 53, 56)" }}>
            {income - outcome} {unicodeSymbol}
          </span>
          <span className={differenceDescription}>
            הפרש
              </span>
        </div>

      </div>

    </div>
  </div>

  return (
    <div className={styles.infoBoxWrapper}>

      <div className={styles.infoBox}>

        {/* header */}
        <div className={styles.header} elevation={1}>

          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              {/* header title */}
              <Typography variant="h6" className={styles.titleText} style={{ color: titleColor }} gutterBottom>
                {title}
              </Typography>
              {/* header faded line */}
            </div>

            <PieChart
              style={{
                width: "60px", height: "60px", position: "absolute",
                left: "20px",
                top: "-16px"
              }}
              paddingAngle={5}
              lineWidth={20}
              totalValue={income + outcome}
              data={[
                { title: 'outcome', value: outcome, color: '#ff5555' },
                { title: 'income', value: income, color: '#29d4a1' },
              ]}
            />
          </div>

          {/* <span data-line={200} className={utilStyles.fadingLine}></span> */}

        </div> {/* end header */}

        {/* body */}
        <div className={styles.body}>
          {/* income */}
          <div className={styles.content}>
            <div className={styles.alignCenter}>
              <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
                <span className={styles.fontSize20} style={{ color: "rgb(26, 177, 132)" }}>{income} {unicodeSymbol}</span>
              </Typography>
              <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
                הכנסות
            </Typography>
            </div>
          </div> {/* end content */}

          {/* outcome */}
          <div className={styles.content}>
            <div className={styles.alignCenter}>
              <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
                <span className={styles.fontSize20} style={{ color: "rgb(255, 69, 69)" }}>{outcome} {unicodeSymbol}</span>
              </Typography>
              <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
                הוצאות
              </Typography>
            </div>
          </div> {/* end content */}

        </div>
        {/* end body */}

      </div>

    </div>

  );

}