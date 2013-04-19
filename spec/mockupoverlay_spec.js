describe("mockupOverlay jQuery plugin", function() {

	// Element to work with
	var container,
      pluginReady,
      readyCallback = function() {
        pluginReady = true;
      };

  beforeEach(function() {
    pluginReady = false;
    container = $('<div id="container"></div>').appendTo('body');
  });

  afterEach(function() {
  	container.remove();
  });
  
  it("should be defined on the jQuery object", function() {
    expect($.fn.mockupOverlay).toBeDefined();
  });

  it("should be chainable", function() {
    expect(container.mockupOverlay('img/sample_design.jpg')).toBe(container);
  });

  it("should add a div#mockup-overlay to the element", function() {
  	var childrenBefore = container.children().length;
  	container.mockupOverlay('img/sample_design.jpg');
  	// Check if a child is added
  	expect(container.children().length).toEqual(childrenBefore + 1);
  	// Search for the id
  	expect(container.find('#mockup-overlay').length).toEqual(1);
  });

// Use async to make the following tests pass

  it("should have a visible option to set the visibility", function() {
    container.mockupOverlay('img/sample_design.jpg', {visible: false, onReady: readyCallback});

    waitsFor(function() {
      return pluginReady;
    }, 'Plugin not working correctly', 2000);

    runs(function() {
      expect(container.find('#mockup-overlay').css('display')).toBe('none');
    });
  });

  it("should use a z-index of 0 when order is set to back", function() {
    container.mockupOverlay('img/sample_design.jpg', {order: 'back', onReady: readyCallback});

    waitsFor(function() {
      return pluginReady;
    }, 'Plugin not working correctly', 2000);

    runs(function() {
      expect(container.find('#mockup-overlay').css('z-index')).toBe('0');
    });
  });
  
  it("should use a z-index of 9999 when order is set to front", function() {
    container.mockupOverlay('img/sample_design.jpg', {order: 'front', onReady: readyCallback});

    waitsFor(function() {
      return pluginReady;
    }, 'Plugin not working correctly', 2000);

    runs(function() {
      expect(container.find('#mockup-overlay').css('z-index')).toBe('9999');
    });
  });

  it("should be able to take an opacity in the options", function() {
    container.mockupOverlay('img/sample_design.jpg', {opacity: 0.7, onReady: readyCallback});

    waitsFor(function() {
      return pluginReady;
    }, 'Plugin not working correctly', 2000);

    runs(function() {
      // 0.7 sometimes becomes '0.699999999342324'
      // Convert to integer and round to testable value
      var num = Math.round(+container.find('#mockup-overlay').css('opacity') * 100) / 100;
      expect(num).toEqual(0.7);
    });
  });

});