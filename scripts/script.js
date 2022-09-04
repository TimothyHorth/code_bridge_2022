google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyA8lHLmVMXQVVYiRuK6B8IVSzoHnJL-jg4",
});
google.charts.setOnLoadCallback(() => {
  // fetch("/JSON/data.JSON")
  fetch(
    "https://raw.githubusercontent.com/TimothyHorth/code_bridge_2022/main/JSON/data.json"
  )
    .then((res) => {
      return res.json();
    })
    .then((output) => {
      const data = JSON.parse(output);
      let arr = [["Country", "Total Capacity [MW]", "Number of Farms"]];
      Object.keys(data.country).forEach((key) => {
        arr.push([key, data.capacity_mw[key], data.number_of_farms[key]]);
      });
      return arr;
    })
    .then((arr) => {
      drawRegionsMap(arr);
    })
    .catch(() => {
      console.log("did not work");
    });

  function drawRegionsMap(arr) {
    var data = google.visualization.arrayToDataTable(arr);

    var options = {
      colorAxis: { colors: ["#F2FBEB", "#8cc962"] },
      backgroundColor: "#FFFFFF",
      datalessRegionColor: "#FFFFFF",
    };

    var chart = new google.visualization.GeoChart(
      document.getElementById("regions_div")
    );

    chart.draw(data, options);
  }
});
