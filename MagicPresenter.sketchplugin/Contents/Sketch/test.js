@import "assert.js"
@import "main.js"

var run = function(context) {
  testLoadFramework()
  testInitializeClass()
  testRespondsToLaunchWithSlides()
  // testLaunchPresentationMode()

  testWrapArtboardInSlides(context)
  testClassNamesForSlides(context)
  testIndexOfArtboard(context)
}

var testLoadFramework = function() {
  var success = load()
  assertTrue("Load Framework", success);
}

var testInitializeClass = function() {
  var cl = myClass()
  var object = cl.alloc().init()
  assertNotNil("Load Classes", cl);
  assertTrue("Has Initialized", object);
}

var testRespondsToLaunchWithSlides = function() {
  var cl = myClass()
  var responds = PresentationController.instancesRespondToSelector("launchWithSlides:atIndex:")
  assertTrue("InstancesResponds to launchWithSlides:atIndex:", responds)
}

var testLaunchPresentationMode = function() {
  var cl = myClass()
  var object = cl.alloc().init()
  var success = object.launchWithSlides_atIndex_(nil, 0);
  assertNotNil("did launch presentation", success)
}

var testWrapArtboardInSlides = function(context) {
  var artboard1 = MSArtboardGroup.alloc().init()
  var artboard2 = MSArtboardGroup.alloc().init()
  var artboards = [NSArray arrayWithArray:[artboard1, artboard2]]
  var slides = createSlides(artboards, context)
  assertTrue("Same Number of Slides", slides.length == artboards.count());
}

var testClassNamesForSlides = function(context) {
  var artboard1 = MSArtboardGroup.alloc().init()
  var artboards = [NSArray arrayWithArray:[artboard1]]
  var slides = createSlides(artboards, context)
  for (var index in slides) {
    assertTrue("Is Slides", slides[index].className().containsString("Slide"))
  }
}

var testIndexOfArtboard = function(context) {
  var artboard1 = MSArtboardGroup.alloc().init()
  var artboard2 = MSArtboardGroup.alloc().init()
  artboard1.objectID = [MSArtboardGroup generateObjectID]
  artboard2.objectID = [MSArtboardGroup generateObjectID]
  var artboards = [NSArray arrayWithArray:[artboard1, artboard2]]
  var slides = createSlides(artboards, context)
  var index = indexOfArtboard(artboard2, artboards)
  assertEquals("Text Index Of Artboard", index, 1)
}