const component = 
  function(model){
    var modelHTML =  model.__html ? model.__html : '';
    var staticPath = model.reactComponent.props._staticPath;
    var props = JSON.stringify(model.reactComponent.props);
    return (
      <div>
      <div id="__reactRoot__" class="__reactRoot__">{modelHTML}</div>
      <style>__css__</style>
      <script>
      __script__
      </script>
    </div>
    )
  }