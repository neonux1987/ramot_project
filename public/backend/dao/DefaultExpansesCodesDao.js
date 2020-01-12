class DefaultExpansesCodesDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
  * get all month expanses records
  */
  getDefaultExpansesCodesTrx = (
    trx = this.connection
  ) => {
    return trx.select(
      //"dec.id AS id",
      "dec.expanses_code_id AS expanses_code_id",
      "dec.supplierName AS supplierName",
      "dec.notes AS notes",
      //"ec.summarized_section_id AS summarized_section_id"
    ).from("default_expanses_codes AS dec")
      .innerJoin("expanses_codes AS ec", "ec.id", "dec.expanses_code_id")
      .orderBy(['code', { column: 'codeName', order: 'asc' }])
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = DefaultExpansesCodesDao;