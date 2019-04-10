
var defaultGraphOptions = {
  style: [ 
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        "label": "data(label)"
      }
    }
  ],

  layout: {
    name: 'circle'
  },
  userZoomingEnabled: false,
  userPanningEnabled: false,
  boxSelectionEnabled: false,
};

