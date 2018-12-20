function getLoad() {
  var ndata = [];

  $.ajax({
    url: 'js/load.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      ndata.push(data["capacity"]);
      ndata.push(data["load"]);
    },
    error: function(err) {
      console.log("ERR");
      console.log(err);
    }
  });

  return ndata;
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

load_chart_canv = $("#load-chart");
var loadChart = new Chart(load_chart_canv, {
  type: 'line',
  data: {
    datasets: [{
      label: 'load',
      data: [],
      borderColor: 'rgb(66, 143, 244)',
      backgroundColor: 'rgba(66, 143, 244, 0.5)',
      lineTension: 0,
    }, {
      label: 'capacity',
      data: [],
      borderColor: 'rgb(244, 169, 65)',
      backgroundColor: 'rgba(244, 169, 65, 0.5)',
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          refresh: 1000,
          onRefresh: function(chart) {
            new_data = getLoad();

            chart.data.datasets.forEach(function(dataset) {
              dataset.data.push({
                x: Date.now(),
                y: new_data.pop(),
              });
            });
          }
        }
      }],
			yAxes: [{
				beginAtZero: true,
				min: 0,
				max: 6,
				stepsize: 1,
			}]
    }
  }
});
