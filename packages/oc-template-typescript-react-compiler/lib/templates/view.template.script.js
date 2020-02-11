window.oc = window.oc || {};
oc.cmd = oc.cmd || [];
oc.cmd.push(function(oc) {
  oc.events.fire("oc:cssDidMount", "__css__");
  oc.requireSeries(__externals__, function() {
    oc.require(
      ["oc", "reactComponents", "__bundleHash__"],
      "__bundlePath__",
      function(ReactComponent) {
        var targetNode = document.getElementById("__reactRoot__");
        targetNode.setAttribute("id", "");
        ReactDOM.render(
          React.createElement(ReactComponent, __props__),
          targetNode
        );
      }
    );
  });
});
