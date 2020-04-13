const dbBackupSvc = require('./DbBackupSvc');
const emptyReportsGeneratorSvc = require('./EmptyReportsGeneratorSvc');

module.exports = {
  "db_backup": dbBackupSvc,
  "empty_reports_generator": emptyReportsGeneratorSvc
}