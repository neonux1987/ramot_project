const { app } = require("electron");

class MyUpdater {
  provider = "github";
  repo = null;
  token = "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";
  user = null;
  projectPath = null;

  constructor() {
    const path = require("path");
    this.projectPath = path.join(__dirname, "../../../");
  }

  async configure() {
    const fse = require("fs-extra");

    // extract info from package.json
    const config = await fse.readJSON(this.projectPath + "package.json");
    this.repo = config.myUpdater.githubInfo.repo;
    this.user = config.myUpdater.githubInfo.user;
  }

  downloadUpdate() {
    const https = require("https"); // or 'https' for https:// URLs
    const fs = require("fs");
    const fse = require("fs-extra");

    const github_url = `https://api.github.com/repos/${this.user}/${this.repo}/releases/latest`;
    const testUrl =
      "https://api.github.com/repos/neonux1987/ramot_project/releases/assets/35287243";

    const auth = `${this.user}:${this.token}`;

    const file = fse.createWriteStream(
      app.getPath("desktop") +
        "/ramot-group-income-outcome-management-setup-1.0.3.exe.blockmap"
    );
    const request = https.get(
      testUrl,
      { auth, headers: { "User-Agent": this.user } },
      function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
          console.log("Download Completed");

          //fse.writeFile(app.getPath("desktop"), file.);
          file.close();
        });
      }
    );
  }
}

module.exports = MyUpdater;
