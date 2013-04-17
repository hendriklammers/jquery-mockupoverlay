describe("mockupOverlay jQuery plugin", function() {

	// Element to work with
	var container;
  beforeEach(function() {
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

  it("should have a visible option to set the visibility", function() {
    container.mockupOverlay('img/sample_design.jpg', {visible: false});
    expect(container.find('#mockup-overlay').css('display')).toBe('none');
  });

});