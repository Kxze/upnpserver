/*jslint node: true */
"use strict";

function ContentHandler() {

}

module.exports = ContentHandler;

ContentHandler.prototype.initialize = function(contentDirectoryService,
    callback) {

  var mimeTypes = this.mimeTypes;
  if (!mimeTypes) {
    return callback();
  }

  var self = this;

  var prepareNode = function(node) {
    var callback = arguments[arguments.length - 1];

//    console.log("node=", node);

    self.prepareNode(node, callback);
  };

  var toJXML = function(node, request, xml) {
    var callback = arguments[arguments.length - 1];

//    console.log("node=", node);

    self.toJXML(node, request, xml, callback);
  };

  var priority = this.priority;

  mimeTypes.forEach(function(mimeType) {
    if (self.prepareNode) {
      contentDirectoryService.asyncOn("prepare:" + mimeType, prepareNode,
          priority);
    }
    if (self.toJXML) {
      contentDirectoryService.asyncOn("toJXML:" + mimeType, toJXML, priority);
    }
  });

  callback();
};

ContentHandler.prototype.prepareNode = function(node, callback) {
  callback();
};