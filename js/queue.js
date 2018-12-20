function getQueue() {
  var ndata = [];

  $.ajax({
    url: 'js/queue.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      ndata.push(data["time"]);
      ndata.push(data["len"]);
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

load_chart_canv = $("#queue-chart");
var loadChart = new Chart(load_chart_canv, {
  type: 'line',
  data: {
    datasets: [{
      label: 'length',
      data: [],
      borderColor: 'rgb(66, 143, 244)',
      backgroundColor: 'rgba(66, 143, 244, 0.5)',
      lineTension: 0,
    }, {
      label: 'time',
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
            new_data = getQueue();

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
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
