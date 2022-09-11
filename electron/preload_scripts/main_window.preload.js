const { ipcRenderer } = require("electron");

const fetchBuildings = async () => {
  const buildings = await ipcRenderer.invoke("get-buildings-by-status", {
    status: "פעיל"
  });

  const settings = await ipcRenderer.invoke("get-settings-invoke");

  localStorage.setItem("buildings", JSON.stringify(buildings.data));
  localStorage.setItem("settings", JSON.stringify(settings.data));

  localStorage.setItem(
    "pages",
    JSON.stringify([
      "monthExpanses",
      "budgetExecutions",
      "summarizedBudgets",
      "statistics"
    ])
  );
};

fetchBuildings();
