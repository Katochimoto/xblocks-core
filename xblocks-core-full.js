(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(new Function("return this")()));
/* jshint unused: false */

//window.Platform = {};
//var logFlags = {};

/* ../node_modules/dom-token-list-polyfill/src/token-list.js begin */
// DOMTokenList polyfill for IE9
(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

var prototype = Array.prototype,
    indexOf = prototype.indexOf,
    slice = prototype.slice,
    push = prototype.push,
    splice = prototype.splice,
    join = prototype.join;

function DOMTokenList(el) {
  this._element = el;
  if (el.className != this._classCache) {
    this._classCache = el.className;

    if (!this._classCache) return;

      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
        i;
    for (i = 0; i < classes.length; i++) {
      push.call(this, classes[i]);
    }
  }
};

function setToClassName(el, classes) {
  el.className = classes.join(' ');
}

DOMTokenList.prototype = {
  add: function(token) {
    if(this.contains(token)) return;
    push.call(this, token);
    setToClassName(this._element, slice.call(this, 0));
  },
  contains: function(token) {
    return indexOf.call(this, token) !== -1;
  },
  item: function(index) {
    return this[index] || null;
  },
  remove: function(token) {
    var i = indexOf.call(this, token);
     if (i === -1) {
       return;
     }
    splice.call(this, i, 1);
    setToClassName(this._element, slice.call(this, 0));
  },
  toString: function() {
    return join.call(this, ' ');
  },
  toggle: function(token) {
    if (indexOf.call(this, token) === -1) {
      this.add(token);
    } else {
      this.remove(token);
    }
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
  if (Object.defineProperty) {
    Object.defineProperty(obj, prop,{
      get : getter
    })
  } else {
    obj.__defineGetter__(prop, getter);
  }
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);
});

})();


/* ../node_modules/dom-token-list-polyfill/src/token-list.js end */

/* ../node_modules/WeakMap/weakmap.js begin */
/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

if (typeof WeakMap === 'undefined') {
  (function() {
    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;

    var WeakMap = function() {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
    };

    WeakMap.prototype = {
      set: function(key, value) {
        var entry = key[this.name];
        if (entry && entry[0] === key)
          entry[1] = value;
        else
          defineProperty(key, this.name, {value: [key, value], writable: true});
      },
      get: function(key) {
        var entry;
        return (entry = key[this.name]) && entry[0] === key ?
            entry[1] : undefined;
      },
      delete: function(key) {
        var entry = key[this.name];
        if (!entry) return false;
        var hasValue = entry[0] === key;
        entry[0] = entry[1] = undefined;
        return hasValue;
      },
      has: function(key) {
        var entry = key[this.name];
        if (!entry) return false;
        return entry[0] === key;
      }
    };

    window.WeakMap = WeakMap;
  })();
}

/* ../node_modules/WeakMap/weakmap.js end */

/* ../node_modules/MutationObservers/MutationObserver.js begin */
/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function(global) {

  var registrationsTable = new WeakMap();

  // We use setImmediate or postMessage for our future callback.
  var setImmediate = window.msSetImmediate;

  // Use post message to emulate setImmediate.
  if (!setImmediate) {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener('message', function(e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function(func) {
          func();
        });
      }
    });
    setImmediate = function(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, '*');
    };
  }

  // This is used to ensure that we never schedule 2 callas to setImmediate
  var isScheduled = false;

  // Keep track of observers that needs to be notified next time.
  var scheduledObservers = [];

  /**
   * Schedules |dispatchCallback| to be called in the future.
   * @param {MutationObserver} observer
   */
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }

  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill &&
        window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
        node;
  }

  function dispatchCallbacks() {
    // http://dom.spec.whatwg.org/#mutation-observers

    isScheduled = false; // Used to allow a new setImmediate call above.

    var observers = scheduledObservers;
    scheduledObservers = [];
    // Sort observers based on their creation UID (incremental).
    observers.sort(function(o1, o2) {
      return o1.uid_ - o2.uid_;
    });

    var anyNonEmpty = false;
    observers.forEach(function(observer) {

      // 2.1, 2.2
      var queue = observer.takeRecords();
      // 2.3. Remove all transient registered observers whose observer is mo.
      removeTransientObserversFor(observer);

      // 2.4
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });

    // 3.
    if (anyNonEmpty)
      dispatchCallbacks();
  }

  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function(node) {
      var registrations = registrationsTable.get(node);
      if (!registrations)
        return;
      registrations.forEach(function(registration) {
        if (registration.observer === observer)
          registration.removeTransientObservers();
      });
    });
  }

  /**
   * This function is used for the "For each registered observer observer (with
   * observer's options as options) in target's list of registered observers,
   * run these substeps:" and the "For each ancestor ancestor of target, and for
   * each registered observer observer (with options options) in ancestor's list
   * of registered observers, run these substeps:" part of the algorithms. The
   * |options.subtree| is checked to ensure that the callback is called
   * correctly.
   *
   * @param {Node} target
   * @param {function(MutationObserverInit):MutationRecord} callback
   */
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);

      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;

          // Only target ignores subtree.
          if (node !== target && !options.subtree)
            continue;

          var record = callback(options);
          if (record)
            registration.enqueue(record);
        }
      }
    }
  }

  var uidCounter = 0;

  /**
   * The class that maps to the DOM MutationObserver interface.
   * @param {Function} callback.
   * @constructor
   */
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }

  JsMutationObserver.prototype = {
    observe: function(target, options) {
      target = wrapIfNeeded(target);

      // 1.1
      if (!options.childList && !options.attributes && !options.characterData ||

          // 1.2
          options.attributeOldValue && !options.attributes ||

          // 1.3
          options.attributeFilter && options.attributeFilter.length &&
              !options.attributes ||

          // 1.4
          options.characterDataOldValue && !options.characterData) {

        throw new SyntaxError();
      }

      var registrations = registrationsTable.get(target);
      if (!registrations)
        registrationsTable.set(target, registrations = []);

      // 2
      // If target's list of registered observers already includes a registered
      // observer associated with the context object, replace that registered
      // observer's options with options.
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }

      // 3.
      // Otherwise, add a new registered observer to target's list of registered
      // observers with the context object as the observer and options as the
      // options, and add target to context object's list of nodes on which it
      // is registered.
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }

      registration.addListeners();
    },

    disconnect: function() {
      this.nodes_.forEach(function(node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            // Each node can only have one registered observer associated with
            // this observer.
            break;
          }
        }
      }, this);
      this.records_ = [];
    },

    takeRecords: function() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };

  /**
   * @param {string} type
   * @param {Node} target
   * @constructor
   */
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }

  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  };

  // We keep track of the two (possibly one) records used in a single mutation.
  var currentRecord, recordWithOldValue;

  /**
   * Creates a record without |oldValue| and caches it as |currentRecord| for
   * later use.
   * @param {string} oldValue
   * @return {MutationRecord}
   */
  function getRecord(type, target) {
    return currentRecord = new MutationRecord(type, target);
  }

  /**
   * Gets or creates a record with |oldValue| based in the |currentRecord|
   * @param {string} oldValue
   * @return {MutationRecord}
   */
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue)
      return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }

  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }

  /**
   * @param {MutationRecord} record
   * @return {boolean} Whether the record represents a record from the current
   * mutation event.
   */
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }

  /**
   * Selects which record, if any, to replace the last record in the queue.
   * This returns |null| if no record should be replaced.
   *
   * @param {MutationRecord} lastRecord
   * @param {MutationRecord} newRecord
   * @param {MutationRecord}
   */
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord)
      return lastRecord;

    // Check if the the record we are adding represents the same record. If
    // so, we keep the one with the oldValue in it.
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
      return recordWithOldValue;

    return null;
  }

  /**
   * Class used to represent a registered observer.
   * @param {MutationObserver} observer
   * @param {Node} target
   * @param {MutationObserverInit} options
   * @constructor
   */
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }

  Registration.prototype = {
    enqueue: function(record) {
      var records = this.observer.records_;
      var length = records.length;

      // There are cases where we replace the last record with the new record.
      // For example if the record represents the same mutation we need to use
      // the one with the oldValue. If we get same record (this can happen as we
      // walk up the tree) we ignore the new record.
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }

      records[length] = record;
    },

    addListeners: function() {
      this.addListeners_(this.target);
    },

    addListeners_: function(node) {
      var options = this.options;
      if (options.attributes)
        node.addEventListener('DOMAttrModified', this, true);

      if (options.characterData)
        node.addEventListener('DOMCharacterDataModified', this, true);

      if (options.childList)
        node.addEventListener('DOMNodeInserted', this, true);

      if (options.childList || options.subtree)
        node.addEventListener('DOMNodeRemoved', this, true);
    },

    removeListeners: function() {
      this.removeListeners_(this.target);
    },

    removeListeners_: function(node) {
      var options = this.options;
      if (options.attributes)
        node.removeEventListener('DOMAttrModified', this, true);

      if (options.characterData)
        node.removeEventListener('DOMCharacterDataModified', this, true);

      if (options.childList)
        node.removeEventListener('DOMNodeInserted', this, true);

      if (options.childList || options.subtree)
        node.removeEventListener('DOMNodeRemoved', this, true);
    },

    /**
     * Adds a transient observer on node. The transient observer gets removed
     * next time we deliver the change records.
     * @param {Node} node
     */
    addTransientObserver: function(node) {
      // Don't add transient observers on the target itself. We already have all
      // the required listeners set up on the target.
      if (node === this.target)
        return;

      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations)
        registrationsTable.set(node, registrations = []);

      // We know that registrations does not contain this because we already
      // checked if node === this.target.
      registrations.push(this);
    },

    removeTransientObservers: function() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];

      transientObservedNodes.forEach(function(node) {
        // Transient observers are never added to the target.
        this.removeListeners_(node);

        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            // Each node can only have one registered observer associated with
            // this observer.
            break;
          }
        }
      }, this);
    },

    handleEvent: function(e) {
      // Stop propagation since we are managing the propagation manually.
      // This means that other mutation events on the page will not work
      // correctly but that is by design.
      e.stopImmediatePropagation();

      switch (e.type) {
        case 'DOMAttrModified':
          // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

          var name = e.attrName;
          var namespace = e.relatedNode.namespaceURI;
          var target = e.target;

          // 1.
          var record = new getRecord('attributes', target);
          record.attributeName = name;
          record.attributeNamespace = namespace;

          // 2.
          var oldValue =
              e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;

          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 3.1, 4.2
            if (!options.attributes)
              return;

            // 3.2, 4.3
            if (options.attributeFilter && options.attributeFilter.length &&
                options.attributeFilter.indexOf(name) === -1 &&
                options.attributeFilter.indexOf(namespace) === -1) {
              return;
            }
            // 3.3, 4.4
            if (options.attributeOldValue)
              return getRecordWithOldValue(oldValue);

            // 3.4, 4.5
            return record;
          });

          break;

        case 'DOMCharacterDataModified':
          // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
          var target = e.target;

          // 1.
          var record = getRecord('characterData', target);

          // 2.
          var oldValue = e.prevValue;


          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 3.1, 4.2
            if (!options.characterData)
              return;

            // 3.2, 4.3
            if (options.characterDataOldValue)
              return getRecordWithOldValue(oldValue);

            // 3.3, 4.4
            return record;
          });

          break;

        case 'DOMNodeRemoved':
          this.addTransientObserver(e.target);
          // Fall through.
        case 'DOMNodeInserted':
          // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
          var target = e.relatedNode;
          var changedNode = e.target;
          var addedNodes, removedNodes;
          if (e.type === 'DOMNodeInserted') {
            addedNodes = [changedNode];
            removedNodes = [];
          } else {

            addedNodes = [];
            removedNodes = [changedNode];
          }
          var previousSibling = changedNode.previousSibling;
          var nextSibling = changedNode.nextSibling;

          // 1.
          var record = getRecord('childList', target);
          record.addedNodes = addedNodes;
          record.removedNodes = removedNodes;
          record.previousSibling = previousSibling;
          record.nextSibling = nextSibling;

          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 2.1, 3.2
            if (!options.childList)
              return;

            // 2.2, 3.3
            return record;
          });

      }

      clearRecords();
    }
  };

  global.JsMutationObserver = JsMutationObserver;

  if (!global.MutationObserver)
    global.MutationObserver = JsMutationObserver;


})(this);

/* ../node_modules/MutationObservers/MutationObserver.js end */

/* ../node_modules/document-register-element/build/document-register-element.max.js begin */
/*!
Copyright (C) 2014 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window, document, Object, REGISTER_ELEMENT){'use strict';

// in case it's there or already patched
if (REGISTER_ELEMENT in document) return;

// DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
// THIS IS A PROJECT BASED ON A BUILD SYSTEM
// THIS FILE IS JUST WRAPPED UP RESULTING IN
// build/document-register-element.js
// and its .max.js counter part

var
  // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),

  // shortcuts and costants
  EXTENDS = 'extends',
  DOM_ATTR_MODIFIED = 'DOMAttrModified',
  DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',

  // valid and invalid node names
  validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
  invalidNames = [
    'ANNOTATION-XML',
    'COLOR-PROFILE',
    'FONT-FACE',
    'FONT-FACE-SRC',
    'FONT-FACE-URI',
    'FONT-FACE-FORMAT',
    'FONT-FACE-NAME',
    'MISSING-GLYPH'
  ],

  // registered types and their prototypes
  types = [],
  protos = [],

  // to query subnodes
  query = '',

  // html shortcut used to feature detect
  documentElement = document.documentElement,

  // ES5 inline helpers || basic patches
  indexOf = types.indexOf || function (v) {
    for(var i = this.length; i-- && this[i] !== v;){}
    return i;
  },

  // other helpers / shortcuts
  OP = Object.prototype,
  hOP = OP.hasOwnProperty,
  iPO = OP.isPrototypeOf,

  defineProperty = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  sPO = Object.setPrototypeOf,

  hasProto = !!Object.__proto__,

  // used to create unique instances
  create = Object.create || function Bridge(proto) {
    // silly broken polyfill probably ever used but short enough to work
    return proto ? ((Bridge.prototype = proto), new Bridge) : this;
  },

  // will set the prototype if possible
  // or copy over all properties
  setPrototype = sPO || (
    hasProto ?
      function (o, p) {
        o.__proto__ = p;
        return o;
      } : (
    (gOPN && gOPD) ?
      (function(){
        function setProperties(o, p) {
          for (var
            key,
            names = gOPN(p),
            i = 0, length = names.length;
            i < length; i++
          ) {
            key = names[i];
            if (!hOP.call(o, key)) {
              defineProperty(o, key, gOPD(p, key));
            }
          }
        }
        return function (o, p) {
          do {
            setProperties(o, p);
          } while (p = gPO(p));
          return o;
        };
      }()) :
      function (o, p) {
        for (var key in p) {
          o[key] = p[key];
        }
        return o;
      }
  )),

  // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready = sPO || hasProto ?
    function (node, proto) {
      if (!iPO.call(proto, node)) {
        setupNode(node, proto);
      }
    } :
    function (node, proto) {
      if (!node[EXPANDO_UID]) {
        node[EXPANDO_UID] = Object(true);
        setupNode(node, proto);
      }
    }
  ,

  // DOM shortcuts and helpers, if any

  MutationObserver = window.MutationObserver ||
                     window.WebKitMutationObserver,

  HTMLElementPrototype = (
    window.HTMLElement ||
    window.Element ||
    window.Node
  ).prototype,

  cloneNode = HTMLElementPrototype.cloneNode,
  setAttribute = HTMLElementPrototype.setAttribute,

  // replaced later on
  createElement = document.createElement,

  // shared observer for all attributes
  attributesObserver = MutationObserver && {
    attributes: true,
    characterData: true,
    attributeOldValue: true
  },

  // useful to detect only if there's no MutationObserver
  DOMAttrModified = MutationObserver || function(e) {
    doesNotSupportDOMAttrModified = false;
    documentElement.removeEventListener(
      DOM_ATTR_MODIFIED,
      DOMAttrModified
    );
  },

  // internal flags
  setListener = false,
  doesNotSupportDOMAttrModified = true,

  // optionally defined later on
  onSubtreeModified,
  callDOMAttrModified,
  getAttributesMirror,
  observer
;

if (!MutationObserver) {
  documentElement.addEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
  documentElement.setAttribute(EXPANDO_UID, 1);
  documentElement.removeAttribute(EXPANDO_UID);
  if (doesNotSupportDOMAttrModified) {
    onSubtreeModified = function (e) {
      var
        node = this,
        oldAttributes,
        newAttributes,
        key
      ;
      if (node === e.target) {
        oldAttributes = node[EXPANDO_UID];
        node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
        for (key in newAttributes) {
          if (!(key in oldAttributes)) {
            // attribute was added
            return callDOMAttrModified(
              0,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              'ADDITION'
            );
          } else if (newAttributes[key] !== oldAttributes[key]) {
            // attribute was changed
            return callDOMAttrModified(
              1,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              'MODIFICATION'
            );
          }
        }
        // checking if it has been removed
        for (key in oldAttributes) {
          if (!(key in newAttributes)) {
            // attribute removed
            return callDOMAttrModified(
              2,
              node,
              key,
              oldAttributes[key],
              newAttributes[key],
              'REMOVAL'
            );
          }
        }
      }
    };
    callDOMAttrModified = function (
      attrChange,
      currentTarget,
      attrName,
      prevValue,
      newValue,
      action
    ) {
      var e = {
        attrChange: attrChange,
        currentTarget: currentTarget,
        attrName: attrName,
        prevValue: prevValue,
        newValue: newValue
      };
      e[action] = attrChange;
      onDOMAttrModified(e);
    };
    getAttributesMirror = function (node) {
      for (var
        attr, name,
        result = {},
        attributes = node.attributes,
        i = 0, length = attributes.length;
        i < length; i++
      ) {
        attr = attributes[i];
        name = attr.name;
        if (name !== 'setAttribute') {
          result[name] = attr.value;
        }
      }
      return result;
    };
  }
}

function loopAndVerify(list, action) {
  for (var i = 0, length = list.length; i < length; i++) {
    verifyAndSetupAndAction(list[i], action);
  }
}

function loopAndSetup(list) {
  for (var i = 0, length = list.length, node; i < length; i++) {
    node = list[i];
    setupNode(node, protos[getTypeIndex(node)]);
  }
}

function executeAction(action) {
  return function (node) {
    if (iPO.call(HTMLElementPrototype, node)) {
      verifyAndSetupAndAction(node, action);
      loopAndVerify(
        node.querySelectorAll(query),
        action
      );
    }
  };
}

function getTypeIndex(target) {
  var is = target.getAttribute('is');
  return indexOf.call(
    types,
    is ?
        is.toUpperCase() :
        target.nodeName
  );
}

function onDOMAttrModified(e) {
  var
    node = e.currentTarget,
    attrChange = e.attrChange,
    prevValue = e.prevValue,
    newValue = e.newValue
  ;
  if (node.attributeChangedCallback &&
      e.attrName !== 'style') {
    node.attributeChangedCallback(
      e.attrName,
      attrChange === e.ADDITION ? null : prevValue,
      attrChange === e.REMOVAL ? null : newValue
    );
  }
}

function onDOMNode(action) {
  var executor = executeAction(action);
  return function (e) {
    executor(e.target);
  };
}

function patchedSetAttribute(name, value) {
  var self = this;
  setAttribute.call(self, name, value);
  onSubtreeModified.call(self, {target: self});
}

function setupNode(node, proto) {
  setPrototype(node, proto);
  if (observer) {
    observer.observe(node, attributesObserver);
  } else {
    if (doesNotSupportDOMAttrModified) {
      node.setAttribute = patchedSetAttribute;
      node[EXPANDO_UID] = getAttributesMirror(node);
      node.addEventListener(DOM_SUBTREE_MODIFIED, onSubtreeModified);
    }
    node.addEventListener(DOM_ATTR_MODIFIED, onDOMAttrModified);
  }
  if (node.createdCallback) {
    node.created = true;
    node.createdCallback();
    node.created = false;
  }
}

function verifyAndSetupAndAction(node, action) {
  var
    fn,
    i = getTypeIndex(node),
    attached = 'attached',
    detached = 'detached'
  ;
  if (-1 < i) {
    patchIfNotAlready(node, protos[i]);
    i = 0;
    if (action === attached && !node[attached]) {
      node[detached] = false;
      node[attached] = true;
      i = 1;
    } else if (action === detached && !node[detached]) {
      node[attached] = false;
      node[detached] = true;
      i = 1;
    }
    if (i && (fn = node[action + 'Callback'])) fn.call(node);
  }
}

// set as enumerable, writable and configurable
document[REGISTER_ELEMENT] = function registerElement(type, options) {
  upperType = type.toUpperCase();
  if (!setListener) {
    // only first time document.registerElement is used
    // we need to set this listener
    // setting it by default might slow down for no reason
    setListener = true;
    if (MutationObserver) {
      observer = (function(attached, detached){
        function checkEmAll(list, callback) {
          for (var i = 0, length = list.length; i < length; callback(list[i++])){}
        }
        return new MutationObserver(function (records) {
          for (var
            current, node,
            i = 0, length = records.length; i < length; i++
          ) {
            current = records[i];
            if (current.type === 'childList') {
              checkEmAll(current.addedNodes, attached);
              checkEmAll(current.removedNodes, detached);
            } else {
              node = current.target;
              if (node.attributeChangedCallback &&
                  current.attributeName !== 'style') {
                node.attributeChangedCallback(
                  current.attributeName,
                  current.oldValue,
                  node.getAttribute(current.attributeName)
                );
              }
            }
          }
        });
      }(executeAction('attached'), executeAction('detached')));
      observer.observe(
        document,
        {
          childList: true,
          subtree: true
        }
      );
    } else {
      document.addEventListener('DOMNodeInserted', onDOMNode('attached'));
      document.addEventListener('DOMNodeRemoved', onDOMNode('detached'));
    }

    document.addEventListener('readystatechange', function (e) {
      loopAndVerify(
        document.querySelectorAll(query),
        'attached'
      );
    });

    document.createElement = function (localName, typeExtension) {
      var i, node = createElement.apply(document, arguments);
      if (typeExtension) {
        node.setAttribute('is', localName = typeExtension.toLowerCase());
      }
      i = indexOf.call(types, localName.toUpperCase());
      if (-1 < i) setupNode(node, protos[i]);
      return node;
    };

    HTMLElementPrototype.cloneNode = function (deep) {
      var
        node = cloneNode.call(this, !!deep),
        i = getTypeIndex(node)
      ;
      if (-1 < i) setupNode(node, protos[i]);
      if (deep) loopAndSetup(node.querySelectorAll(query));
      return node;
    };
  }

  if (-1 < indexOf.call(types, upperType)) {
    throw new Error('A ' + type + ' type is already registered');
  }

  if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
    throw new Error('The type ' + type + ' is invalid');
  }

  var
    constructor = function () {
      return document.createElement(nodeName, extending && upperType);
    },
    opt = options || OP,
    extending = hOP.call(opt, EXTENDS),
    nodeName = extending ? options[EXTENDS] : upperType,
    i = types.push(upperType) - 1,
    upperType
  ;

  query = query.concat(
    query.length ? ',' : '',
    extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
  );

  constructor.prototype = (
    protos[i] = hOP.call(opt, 'prototype') ?
      opt.prototype :
      create(HTMLElementPrototype)
  );

  loopAndVerify(
    document.querySelectorAll(query),
    'attached'
  );

  return constructor;
};


}(window, document, Object, 'registerElement'));
/* ../node_modules/document-register-element/build/document-register-element.max.js end */


/*
(function() {
    include:../node_modules/CustomElements/src/scope.js
    include:../node_modules/CustomElements/src/Observer.js
    include:../node_modules/CustomElements/src/CustomElements.js
    include:../node_modules/CustomElements/src/Parser.js
    include:../node_modules/CustomElements/src/boot.js
}());

(function() {
    include:../node_modules/HTMLImports/src/scope.js
    include:../node_modules/HTMLImports/src/Loader.js
    include:../node_modules/HTMLImports/src/Parser.js
    include:../node_modules/HTMLImports/src/HTMLImports.js
    include:../node_modules/HTMLImports/src/Observer.js
    include:../node_modules/HTMLImports/src/boot.js
}());
*/

/* ../node_modules/x-tag-core/src/core.js begin */
(function () {

/*** Variables ***/

  var win = window,
    doc = document,
    container = doc.createElement('div'),
    noop = function(){},
    trueop = function(){ return true; },
    regexPseudoSplit = /([\w-]+(?:\([^\)]+\))?)/g,
    regexPseudoReplace = /(\w*)(?:\(([^\)]*)\))?/,
    regexDigits = /(\d+)/g,
    keypseudo = {
      action: function (pseudo, event) {
        return pseudo.value.match(regexDigits).indexOf(String(event.keyCode)) > -1 == (pseudo.name == 'keypass') || null;
      }
    },
    /*
      - The prefix object generated here is added to the xtag object as xtag.prefix later in the code
      - Prefix provides a variety of prefix variations for the browser in which your code is running
      - The 4 variations of prefix are as follows:
        * prefix.dom: the correct prefix case and form when used on DOM elements/style properties
        * prefix.lowercase: a lowercase version of the prefix for use in various user-code situations
        * prefix.css: the lowercase, dashed version of the prefix 
        * prefix.js: addresses prefixed APIs present in global and non-Element contexts
    */
    prefix = (function () {
      var styles = win.getComputedStyle(doc.documentElement, ''),
          pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
          )[1];
      return {
        dom: pre == 'ms' ? 'MS' : pre,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre == 'ms' ? pre : pre[0].toUpperCase() + pre.substr(1)
      };
    })(),
    matchSelector = Element.prototype.matchesSelector || Element.prototype[prefix.lowercase + 'MatchesSelector'],
    mutation = win.MutationObserver || win[prefix.js + 'MutationObserver'];

/*** Functions ***/

// Utilities
  
  /*
    This is an enhanced typeof check for all types of objects. Where typeof would normaly return
    'object' for many common DOM objects (like NodeLists and HTMLCollections).
    - For example: typeOf(document.children) will correctly return 'htmlcollection'
  */
  var typeCache = {},
      typeString = typeCache.toString,
      typeRegexp = /\s([a-zA-Z]+)/;
  function typeOf(obj) {
    var type = typeString.call(obj);
    return typeCache[type] || (typeCache[type] = type.match(typeRegexp)[1].toLowerCase());
  }
  
  function clone(item, type){
    var fn = clone[type || typeOf(item)];
    return fn ? fn(item) : item;
  }
    clone.object = function(src){
      var obj = {};
      for (var key in src) obj[key] = clone(src[key]);
      return obj;
    };
    clone.array = function(src){
      var i = src.length, array = new Array(i);
      while (i--) array[i] = clone(src[i]);
      return array;
    };
  
  /*
    The toArray() method allows for conversion of any object to a true array. For types that
    cannot be converted to an array, the method returns a 1 item array containing the passed-in object.
  */
  var unsliceable = ['undefined', 'null', 'number', 'boolean', 'string', 'function'];
  function toArray(obj){
    return unsliceable.indexOf(typeOf(obj)) == -1 ?
    Array.prototype.slice.call(obj, 0) :
    [obj];
  }

// DOM

  var str = '';
  function query(element, selector){
    return (selector || str).length ? toArray(element.querySelectorAll(selector)) : [];
  }

  function parseMutations(element, mutations) {
    var diff = { added: [], removed: [] };
    mutations.forEach(function(record){
      record._mutation = true;
      for (var z in diff) {
        var type = element._records[(z == 'added') ? 'inserted' : 'removed'],
          nodes = record[z + 'Nodes'], length = nodes.length;
        for (var i = 0; i < length && diff[z].indexOf(nodes[i]) == -1; i++){
          diff[z].push(nodes[i]);
          type.forEach(function(fn){
            fn(nodes[i], record);
          });
        }
      }
    });
  }

// Mixins

  function mergeOne(source, key, current){
    var type = typeOf(current);
    if (type == 'object' && typeOf(source[key]) == 'object') xtag.merge(source[key], current);
    else source[key] = clone(current, type);
    return source;
  }

  function wrapMixin(tag, key, pseudo, value, original){
    var fn = original[key];
    if (!(key in original)) {
      original[key + (pseudo.match(':mixins') ? '' : ':mixins')] = value;
    }
    else if (typeof original[key] == 'function') {
      if (!fn.__mixins__) fn.__mixins__ = [];
      fn.__mixins__.push(xtag.applyPseudos(pseudo, value, tag.pseudos));
    }
  }

  var uniqueMixinCount = 0;
  function mergeMixin(tag, mixin, original, mix) {
    if (mix) {
      var uniques = {};
      for (var z in original) uniques[z.split(':')[0]] = z;
      for (z in mixin) {
        wrapMixin(tag, uniques[z.split(':')[0]] || z, z, mixin[z], original);
      }
    }
    else {
      for (var zz in mixin){
        original[zz + ':__mixin__(' + (uniqueMixinCount++) + ')'] = xtag.applyPseudos(zz, mixin[zz], tag.pseudos);
      }
    }
  }

  function applyMixins(tag) {
    tag.mixins.forEach(function (name) {
      var mixin = xtag.mixins[name];
      for (var type in mixin) {
        var item = mixin[type],
            original = tag[type];
        if (!original) tag[type] = item;
        else {
          switch (type){
            case 'accessors': case 'prototype':
              for (var z in item) {
                if (!original[z]) original[z] = item[z];
                else mergeMixin(tag, item[z], original[z], true);
              }
              break;
            default: mergeMixin(tag, item, original, type != 'events');
          }
        }
      }
    });
    return tag;
  }

// Events

  function delegateAction(pseudo, event) {
    var match, target = event.target;
    if (!target.tagName) return null;
    if (xtag.matchSelector(target, pseudo.value)) match = target;
    else if (xtag.matchSelector(target, pseudo.value + ' *')) {
      var parent = target.parentNode;
      while (!match) {
        if (xtag.matchSelector(parent, pseudo.value)) match = parent;
        parent = parent.parentNode;
      }
    }
    return match ? pseudo.listener = pseudo.listener.bind(match) : null;
  }

  function touchFilter(event) {
    if (event.type.match('touch')){
      event.target.__touched__ = true;
    }
    else if (event.target.__touched__ && event.type.match('mouse')){
      delete event.target.__touched__;
      return;
    }
    return true;
  }

  function createFlowEvent(type) {
    var flow = type == 'over';
    return {
      attach: 'OverflowEvent' in win ? 'overflowchanged' : [],
      condition: function (event, custom) {
        event.flow = type;
        return event.type == (type + 'flow') ||
        ((event.orient === 0 && event.horizontalOverflow == flow) ||
        (event.orient == 1 && event.verticalOverflow == flow) ||
        (event.orient == 2 && event.horizontalOverflow == flow && event.verticalOverflow == flow));
      }
    };
  }

  function writeProperty(key, event, base, desc){
    if (desc) event[key] = base[key];
    else Object.defineProperty(event, key, {
      writable: true,
      enumerable: true,
      value: base[key]
    });
  }

  var skipProps = {};
  for (var z in doc.createEvent('CustomEvent')) skipProps[z] = 1;
  function inheritEvent(event, base){
    var desc = Object.getOwnPropertyDescriptor(event, 'target');
    for (var z in base) {
      if (!skipProps[z]) writeProperty(z, event, base, desc);
    }
    event.baseEvent = base;
  }

// Accessors

  function getArgs(attr, value){
    return {
      value: attr.boolean ? '' : value,
      method: attr.boolean && !value ? 'removeAttribute' : 'setAttribute'
    };
  }

  function modAttr(element, attr, name, value){
    var args = getArgs(attr, value);
    element[args.method](name, args.value);
  }

  function syncAttr(element, attr, name, value, method){
    var nodes = attr.property ? [element.xtag[attr.property]] : attr.selector ? xtag.query(element, attr.selector) : [],
        index = nodes.length;
    while (index--) nodes[index][method](name, value);
  }

  function updateView(element, name, value){
    if (element.__view__){
      element.__view__.updateBindingValue(element, name, value);
    }
  }

  function attachProperties(tag, prop, z, accessor, attr, name){
    var key = z.split(':'), type = key[0];
    if (type == 'get') {
      key[0] = prop;
      tag.prototype[prop].get = xtag.applyPseudos(key.join(':'), accessor[z], tag.pseudos, accessor[z]);
    }
    else if (type == 'set') {
      key[0] = prop;
      var setter = tag.prototype[prop].set = xtag.applyPseudos(key.join(':'), attr ? function(value){
        this.xtag._skipSet = true;
        if (!this.xtag._skipAttr) modAttr(this, attr, name, value);
        if (this.xtag._skipAttr && attr.skip) delete this.xtag._skipAttr;
        accessor[z].call(this, attr.boolean ? !!value : value);
        updateView(this, name, value);
        delete this.xtag._skipSet;
      } : accessor[z] ? function(value){
        accessor[z].call(this, value);
        updateView(this, name, value);
      } : null, tag.pseudos, accessor[z]);

      if (attr) attr.setter = setter;
    }
    else tag.prototype[prop][z] = accessor[z];
  }

  function parseAccessor(tag, prop){
    tag.prototype[prop] = {};
    var accessor = tag.accessors[prop],
        attr = accessor.attribute,
        name = attr && attr.name ? attr.name.toLowerCase() : prop;

    if (attr) {
      attr.key = prop;
      tag.attributes[name] = attr;
    }

    for (var z in accessor) attachProperties(tag, prop, z, accessor, attr, name);

    if (attr) {
      if (!tag.prototype[prop].get) {
        var method = (attr.boolean ? 'has' : 'get') + 'Attribute';
        tag.prototype[prop].get = function(){
          return this[method](name);
        };
      }
      if (!tag.prototype[prop].set) tag.prototype[prop].set = function(value){
        modAttr(this, attr, name, value);
        updateView(this, name, value);
      };
    }
  }
  
  var unwrapComment = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
  function parseMultiline(fn){
    return unwrapComment.exec(fn.toString())[1];
  }
  
  var readyTags = {};
  function fireReady(name){
    readyTags[name] = (readyTags[name] || []).filter(function(obj){
      return (obj.tags = obj.tags.filter(function(z){
        return z != name && !xtag.tags[z];
      })).length || obj.fn();
    });
  }

/*** X-Tag Object Definition ***/

  var xtag = {
    tags: {},
    defaultOptions: {
      pseudos: [],
      mixins: [],
      events: {},
      methods: {},
      accessors: {},
      lifecycle: {},
      attributes: {},
      'prototype': {
        xtag: {
          get: function(){
            return this.__xtag__ ? this.__xtag__ : (this.__xtag__ = { data: {} });
          }
        }
      }
    },
    register: function (name, options) {
      var _name;
      if (typeof name == 'string') {
        _name = name.toLowerCase();
      } else {
        return;
      }
      xtag.tags[_name] = options || {};
      // save prototype for actual object creation below
      var basePrototype = options.prototype;
      delete options.prototype;
      var tag = xtag.tags[_name].compiled = applyMixins(xtag.merge({}, xtag.defaultOptions, options));

      for (var z in tag.events) tag.events[z] = xtag.parseEvent(z, tag.events[z]);
      for (z in tag.lifecycle) tag.lifecycle[z.split(':')[0]] = xtag.applyPseudos(z, tag.lifecycle[z], tag.pseudos, tag.lifecycle[z]);
      for (z in tag.methods) tag.prototype[z.split(':')[0]] = { value: xtag.applyPseudos(z, tag.methods[z], tag.pseudos, tag.methods[z]), enumerable: true };
      for (z in tag.accessors) parseAccessor(tag, z);
      
      var shadow = tag.shadow ? xtag.createFragment(tag.shadow) : null;
      
      var ready = tag.lifecycle.created || tag.lifecycle.ready;
      tag.prototype.createdCallback = {
        enumerable: true,
        value: function(){
          var element = this;
          if (shadow && this.createShadowRoot) {
            var root = this.createShadowRoot();
            root.appendChild(shadow.cloneNode(true));
          }
          xtag.addEvents(this, tag.events);
          var output = ready ? ready.apply(this, arguments) : null;
          for (var name in tag.attributes) {
            var attr = tag.attributes[name],
                hasAttr = this.hasAttribute(name);
            if (hasAttr || attr.boolean) {
              this[attr.key] = attr.boolean ? hasAttr : this.getAttribute(name);
            }
          }
          tag.pseudos.forEach(function(obj){
            obj.onAdd.call(element, obj);
          });
          return output;
        }
      };
			
      var inserted = tag.lifecycle.inserted,
          removed = tag.lifecycle.removed;
      if (inserted || removed) {
        tag.prototype.attachedCallback = { value: function(){
          if (removed) this.xtag.__parentNode__ = this.parentNode;
          if (inserted) return inserted.apply(this, arguments);
        }, enumerable: true };
      }
      if (removed) {
        tag.prototype.detachedCallback = { value: function(){
          var args = toArray(arguments);
          args.unshift(this.xtag.__parentNode__);
          var output = removed.apply(this, args);
          delete this.xtag.__parentNode__;
          return output;
        }, enumerable: true };
      }
      if (tag.lifecycle.attributeChanged) tag.prototype.attributeChangedCallback = { value: tag.lifecycle.attributeChanged, enumerable: true };

      var setAttribute = tag.prototype.setAttribute || HTMLElement.prototype.setAttribute;
      tag.prototype.setAttribute = {
        writable: true,
        enumberable: true,
        value: function (name, value){
          var attr = tag.attributes[name.toLowerCase()];
          if (!this.xtag._skipAttr) setAttribute.call(this, name, attr && attr.boolean ? '' : value);
          if (attr) {
            if (attr.setter && !this.xtag._skipSet) {
              this.xtag._skipAttr = true;
              attr.setter.call(this, attr.boolean ? true : value);
            }
            value = attr.skip ? attr.boolean ? this.hasAttribute(name) : this.getAttribute(name) : value;
            syncAttr(this, attr, name, attr.boolean ? '' : value, 'setAttribute');
          }
          delete this.xtag._skipAttr;
        }
      };

      var removeAttribute = tag.prototype.removeAttribute || HTMLElement.prototype.removeAttribute;
      tag.prototype.removeAttribute = {
        writable: true,
        enumberable: true,
        value: function (name){
          var attr = tag.attributes[name.toLowerCase()];
          if (!this.xtag._skipAttr) removeAttribute.call(this, name);
          if (attr) {
            if (attr.setter && !this.xtag._skipSet) {
              this.xtag._skipAttr = true;
              attr.setter.call(this, attr.boolean ? false : undefined);
            }
            syncAttr(this, attr, name, undefined, 'removeAttribute');
          }
          delete this.xtag._skipAttr;
        }
      };

      var elementProto = basePrototype ?
            basePrototype :
            options['extends'] ?
            Object.create(doc.createElement(options['extends']).constructor).prototype :
            win.HTMLElement.prototype;

      var definition = {
        'prototype': Object.create(elementProto, tag.prototype)
      };
      if (options['extends']) {
        definition['extends'] = options['extends'];
      }
      var reg = doc.registerElement(_name, definition);
      fireReady(_name);
      return reg;
    },
    
    /*
      NEEDS MORE TESTING!
      
      Allows for async dependency resolution, fires when all passed-in elements are 
      registered and parsed
    */
    ready: function(names, fn){
      var obj = { tags: toArray(names), fn: fn };
      if (obj.tags.reduce(function(last, name){
        if (xtag.tags[name]) return last;
        (readyTags[name] = readyTags[name] || []).push(obj);
      }, true)) fn();
    },

    /* Exposed Variables */

    mixins: {},
    prefix: prefix,
    captureEvents: ['focus', 'blur', 'scroll', 'underflow', 'overflow', 'overflowchanged', 'DOMMouseScroll'],
    customEvents: {
      overflow: createFlowEvent('over'),
      underflow: createFlowEvent('under'),
      animationstart: {
        attach: [prefix.dom + 'AnimationStart']
      },
      animationend: {
        attach: [prefix.dom + 'AnimationEnd']
      },
      transitionend: {
        attach: [prefix.dom + 'TransitionEnd']
      },
      move: {
        attach: ['mousemove', 'touchmove'],
        condition: touchFilter
      },
      enter: {
        attach: ['mouseover', 'touchenter'],
        condition: touchFilter
      },
      leave: {
        attach: ['mouseout', 'touchleave'],
        condition: touchFilter
      },
      scrollwheel: {
        attach: ['DOMMouseScroll', 'mousewheel'],
        condition: function(event){
          event.delta = event.wheelDelta ? event.wheelDelta / 40 : Math.round(event.detail / 3.5 * -1);
          return true;
        }
      },
      tapstart: {
        observe: {
          mousedown: doc,
          touchstart: doc
        },
        condition: touchFilter
      },
      tapend: {
        observe: {
          mouseup: doc,
          touchend: doc
        },
        condition: touchFilter
      },
      tapmove: {
        attach: ['tapstart', 'dragend', 'touchcancel'],
        condition: function(event, custom){
          switch (event.type) {
            case 'move':  return true;
            case 'dragover':
              var last = custom.lastDrag || {};
              custom.lastDrag = event;
              return (last.pageX != event.pageX && last.pageY != event.pageY) || null;
            case 'tapstart':
              if (!custom.move) {
                custom.current = this;
                custom.move = xtag.addEvents(this, {
                  move: custom.listener,
                  dragover: custom.listener
                });
                custom.tapend = xtag.addEvent(doc, 'tapend', custom.listener);
              }
              break;
            case 'tapend': case 'dragend': case 'touchcancel':
              if (!event.touches.length) {
                if (custom.move) xtag.removeEvents(custom.current , custom.move || {});
                if (custom.tapend) xtag.removeEvent(doc, custom.tapend || {});
                delete custom.lastDrag;
                delete custom.current;
                delete custom.tapend;
                delete custom.move;
              }
          }
        }
      }
    },
    pseudos: {
      __mixin__: {},
      /*
        
        
      */
      mixins: {
        onCompiled: function(fn, pseudo){
          var mixins = pseudo.source.__mixins__;
          if (mixins) switch (pseudo.value) {
            case 'before': return function(){
              var self = this,
                  args = arguments;
              mixins.forEach(function(m){
                m.apply(self, args);
              });
              return fn.apply(self, args);
            };
            case null: case '': case 'after': return function(){
              var self = this,
                  args = arguments;
                  returns = fn.apply(self, args);
              mixins.forEach(function(m){
                m.apply(self, args);
              });
              return returns;
            };
          }
        }
      },
      keypass: keypseudo,
      keyfail: keypseudo,
      delegate: { action: delegateAction },
      within: {
        action: delegateAction,
        onAdd: function(pseudo){
          var condition = pseudo.source.condition;
          if (condition) pseudo.source.condition = function(event, custom){
            return xtag.query(this, pseudo.value).filter(function(node){
              return node == event.target || node.contains ? node.contains(event.target) : null;
            })[0] ? condition.call(this, event, custom) : null;
          };
        }
      },
      preventable: {
        action: function (pseudo, event) {
          return !event.defaultPrevented;
        }
      }
    },

    /* UTILITIES */

    clone: clone,
    typeOf: typeOf,
    toArray: toArray,
    
    wrap: function (original, fn) {
      return function(){
        var args = arguments,
            output = original.apply(this, args);
        fn.apply(this, args);
        return output;
      };
    },
    /*
      Recursively merges one object with another. The first argument is the destination object,
      all other objects passed in as arguments are merged from right to left, conflicts are overwritten
    */
    merge: function(source, k, v){
      if (typeOf(k) == 'string') return mergeOne(source, k, v);
      for (var i = 1, l = arguments.length; i < l; i++){
        var object = arguments[i];
        for (var key in object) mergeOne(source, key, object[key]);
      }
      return source;
    },
    
    /*
      ----- This should be simplified! -----
      Generates a random ID string
    */ 
    uid: function(){
      return Math.random().toString(36).substr(2,10);
    },

    /* DOM */

    query: query,

    skipTransition: function(element, fn, bind){
      var prop = prefix.js + 'TransitionProperty';
      element.style[prop] = element.style.transitionProperty = 'none';
      var callback = fn ? fn.call(bind) : null;
      return xtag.requestFrame(function(){
        xtag.requestFrame(function(){
          element.style[prop] = element.style.transitionProperty = '';
          if (callback) xtag.requestFrame(callback);
        });
      });
    },
    
    requestFrame: (function(){
      var raf = win.requestAnimationFrame ||
                win[prefix.lowercase + 'RequestAnimationFrame'] ||
                function(fn){ return win.setTimeout(fn, 20); };
      return function(fn){ return raf(fn); };
    })(),
    
    cancelFrame: (function(){
      var cancel = win.cancelAnimationFrame ||
                   win[prefix.lowercase + 'CancelAnimationFrame'] ||
                   win.clearTimeout;
      return function(id){ return cancel(id); };  
    })(),

    matchSelector: function (element, selector) {
      return matchSelector.call(element, selector);
    },

    set: function (element, method, value) {
      element[method] = value;
      if (window.CustomElements) CustomElements.upgradeAll(element);
    },

    innerHTML: function(el, html){
      xtag.set(el, 'innerHTML', html);
    },

    hasClass: function (element, klass) {
      return element.className.split(' ').indexOf(klass.trim())>-1;
    },

    addClass: function (element, klass) {
      var list = element.className.trim().split(' ');
      klass.trim().split(' ').forEach(function (name) {
        if (!~list.indexOf(name)) list.push(name);
      });
      element.className = list.join(' ').trim();
      return element;
    },

    removeClass: function (element, klass) {
      var classes = klass.trim().split(' ');
      element.className = element.className.trim().split(' ').filter(function (name) {
        return name && !~classes.indexOf(name);
      }).join(' ');
      return element;
    },

    toggleClass: function (element, klass) {
      return xtag[xtag.hasClass(element, klass) ? 'removeClass' : 'addClass'].call(null, element, klass);
    },
    
    /*
      Runs a query on only the children of an element
    */
    queryChildren: function (element, selector) {
      var id = element.id,
        guid = element.id = id || 'x_' + xtag.uid(),
        attr = '#' + guid + ' > ',
        noParent = false;
      if (!element.parentNode){
        noParent = true;
        container.appendChild(element);
      }
      selector = attr + (selector + '').replace(',', ',' + attr, 'g');
      var result = element.parentNode.querySelectorAll(selector);
      if (!id) element.removeAttribute('id');
      if (noParent){
        container.removeChild(element);
      }
      return toArray(result);
    },
    /*
      Creates a document fragment with the content passed in - content can be
      a string of HTML, an element, or an array/collection of elements
    */
    createFragment: function(content) {
      var frag = doc.createDocumentFragment();
      if (content) {
        var div = frag.appendChild(doc.createElement('div')),
          nodes = toArray(content.nodeName ? arguments : !(div.innerHTML = typeof content == 'function' ? parseMultiline(content) : content) || div.children),
          length = nodes.length,
          index = 0;
        while (index < length) frag.insertBefore(nodes[index++], div);
        frag.removeChild(div);
      }
      return frag;
    },
    
    /*
      Removes an element from the DOM for more performant node manipulation. The element
      is placed back into the DOM at the place it was taken from.
    */
    manipulate: function(element, fn){
      var next = element.nextSibling,
        parent = element.parentNode,
        frag = doc.createDocumentFragment(),
        returned = fn.call(frag.appendChild(element), frag) || element;
      if (next) parent.insertBefore(returned, next);
      else parent.appendChild(returned);
    },

    /* PSEUDOS */

    applyPseudos: function(key, fn, target, source) {
      var listener = fn,
          pseudos = {};
      if (key.match(':')) {
        var split = key.match(regexPseudoSplit),
            i = split.length;
        while (--i) {
          split[i].replace(regexPseudoReplace, function (match, name, value) {
            if (!xtag.pseudos[name]) throw "pseudo not found: " + name + " " + split;
            value = (value === '' || typeof value == 'undefined') ? null : value;
            var pseudo = pseudos[i] = Object.create(xtag.pseudos[name]);
            pseudo.key = key;
            pseudo.name = name;
            pseudo.value = value;
            pseudo['arguments'] = (value || '').split(',');
            pseudo.action = pseudo.action || trueop;
            pseudo.source = source;
            var last = listener;
            listener = function(){
              var args = toArray(arguments),
                  obj = {
                    key: key,
                    name: name,
                    value: value,
                    source: source,
                    'arguments': pseudo['arguments'],
                    listener: last
                  };
              var output = pseudo.action.apply(this, [obj].concat(args));
              if (output === null || output === false) return output;
              return obj.listener.apply(this, args);
            };
            if (target && pseudo.onAdd) {
              if (target.nodeName) pseudo.onAdd.call(target, pseudo);
              else target.push(pseudo);
            }
          });
        }
      }
      for (var z in pseudos) {
        if (pseudos[z].onCompiled) listener = pseudos[z].onCompiled(listener, pseudos[z]) || listener;
      }
      return listener;
    },

    removePseudos: function(target, pseudos){
      pseudos.forEach(function(obj){
        if (obj.onRemove) obj.onRemove.call(target, obj);
      });
    },

  /*** Events ***/

    parseEvent: function(type, fn) {
      var pseudos = type.split(':'),
          key = pseudos.shift(),
          custom = xtag.customEvents[key],
          event = xtag.merge({
            type: key,
            stack: noop,
            condition: trueop,
            attach: [],
            _attach: [],
            pseudos: '',
            _pseudos: [],
            onAdd: noop,
            onRemove: noop
          }, custom || {});
      event.attach = toArray(event.base || event.attach);
      event.chain = key + (event.pseudos.length ? ':' + event.pseudos : '') + (pseudos.length ? ':' + pseudos.join(':') : '');
      var condition = event.condition;
      event.condition = function(e){
        var t = e.touches, tt = e.targetTouches;
        return condition.apply(this, arguments);
      };
      var stack = xtag.applyPseudos(event.chain, fn, event._pseudos, event);
      event.stack = function(e){
        e.currentTarget = e.currentTarget || this;
        var t = e.touches, tt = e.targetTouches;
        var detail = e.detail || {};
        if (!detail.__stack__) return stack.apply(this, arguments);
        else if (detail.__stack__ == stack) {
          e.stopPropagation();
          e.cancelBubble = true;
          return stack.apply(this, arguments);
        }
      };
      event.listener = function(e){
        var args = toArray(arguments),
            output = event.condition.apply(this, args.concat([event]));
        if (!output) return output;
        // The second condition in this IF is to address the following Blink regression: https://code.google.com/p/chromium/issues/detail?id=367537
        // Remove this when affected browser builds with this regression fall below 5% marketshare
        if (e.type != key && (e.baseEvent && e.type != e.baseEvent.type)) {
          xtag.fireEvent(e.target, key, {
            baseEvent: e,
            detail: output !== true && (output.__stack__ = stack) ? output : { __stack__: stack }
          });
        }
        else return event.stack.apply(this, args);
      };
      event.attach.forEach(function(name) {
        event._attach.push(xtag.parseEvent(name, event.listener));
      });
      if (custom && custom.observe && !custom.__observing__) {
        custom.observer = function(e){
          var output = event.condition.apply(this, toArray(arguments).concat([custom]));
          if (!output) return output;
          xtag.fireEvent(e.target, key, {
            baseEvent: e,
            detail: output !== true ? output : {}
          });
        };
        for (var z in custom.observe) xtag.addEvent(custom.observe[z] || document, z, custom.observer, true);
        custom.__observing__ = true;
      }
      return event;
    },

    addEvent: function (element, type, fn, capture) {
      var event = typeof fn == 'function' ? xtag.parseEvent(type, fn) : fn;
      event._pseudos.forEach(function(obj){
        obj.onAdd.call(element, obj);
      });
      event._attach.forEach(function(obj) {
        xtag.addEvent(element, obj.type, obj);
      });
      event.onAdd.call(element, event, event.listener);
      element.addEventListener(event.type, event.stack, capture || xtag.captureEvents.indexOf(event.type) > -1);
      return event;
    },

    addEvents: function (element, obj) {
      var events = {};
      for (var z in obj) {
        events[z] = xtag.addEvent(element, z, obj[z]);
      }
      return events;
    },

    removeEvent: function (element, type, event) {
      event = event || type;
      event.onRemove.call(element, event, event.listener);
      xtag.removePseudos(element, event._pseudos);
      event._attach.forEach(function(obj) {
        xtag.removeEvent(element, obj);
      });
      element.removeEventListener(event.type, event.stack);
    },

    removeEvents: function(element, obj){
      for (var z in obj) xtag.removeEvent(element, obj[z]);
    },

    fireEvent: function(element, type, options, warn){
      var event = doc.createEvent('CustomEvent');
      options = options || {};
      if (warn) console.warn('fireEvent has been modified');
      event.initCustomEvent(type,
        options.bubbles !== false,
        options.cancelable !== false,
        options.detail
      );
      if (options.baseEvent) inheritEvent(event, options.baseEvent);
      try { element.dispatchEvent(event); }
      catch (e) {
        console.warn('This error may have been caused by a change in the fireEvent method', e);
      }
    },
    
    /*
      Listens for insertion or removal of nodes from a given element using 
      Mutation Observers, or Mutation Events as a fallback
    */
    addObserver: function(element, type, fn){
      if (!element._records) {
        element._records = { inserted: [], removed: [] };
        if (mutation){
          element._observer = new mutation(function(mutations) {
            parseMutations(element, mutations);
          });
          element._observer.observe(element, {
            subtree: true,
            childList: true,
            attributes: !true,
            characterData: false
          });
        }
        else ['Inserted', 'Removed'].forEach(function(type){
          element.addEventListener('DOMNode' + type, function(event){
            event._mutation = true;
            element._records[type.toLowerCase()].forEach(function(fn){
              fn(event.target, event);
            });
          }, false);
        });
      }
      if (element._records[type].indexOf(fn) == -1) element._records[type].push(fn);
    },

    removeObserver: function(element, type, fn){
      var obj = element._records;
      if (obj && fn){
        obj[type].splice(obj[type].indexOf(fn), 1);
      }
      else{
        obj[type] = [];
      }
    }

  };

/*** Universal Touch ***/

var touching = false,
    touchTarget = null;

doc.addEventListener('mousedown', function(e){
  touching = true;
  touchTarget = e.target;
}, true);

doc.addEventListener('mouseup', function(){
  touching = false;
  touchTarget = null;
}, true);

doc.addEventListener('dragend', function(){
  touching = false;
  touchTarget = null;
}, true);

var UIEventProto = {
  touches: {
    configurable: true,
    get: function(){
      return this.__touches__ ||
        (this.identifier = 0) ||
        (this.__touches__ = touching ? [this] : []);
    }
  },
  targetTouches: {
    configurable: true,
    get: function(){
      return this.__targetTouches__ || (this.__targetTouches__ =
        (touching && this.currentTarget &&
        (this.currentTarget == touchTarget ||
        (this.currentTarget.contains && this.currentTarget.contains(touchTarget)))) ? (this.identifier = 0) || [this] : []);
    }
  },
  changedTouches: {
    configurable: true,
    get: function(){
      return this.__changedTouches__ || (this.identifier = 0) || (this.__changedTouches__ = [this]);
    }
  }
};

for (z in UIEventProto){
  UIEvent.prototype[z] = UIEventProto[z];
  Object.defineProperty(UIEvent.prototype, z, UIEventProto[z]);
}


/*** Custom Event Definitions ***/

  function addTap(el, tap, e){
    if (!el.__tap__) {
      el.__tap__ = { click: e.type == 'mousedown' };
      if (el.__tap__.click) el.addEventListener('click', tap.observer);
      else {
        el.__tap__.scroll = tap.observer.bind(el);
        window.addEventListener('scroll', el.__tap__.scroll, true);
        el.addEventListener('touchmove', tap.observer);
        el.addEventListener('touchcancel', tap.observer);
        el.addEventListener('touchend', tap.observer);
      }
    }
    if (!el.__tap__.click) {
      el.__tap__.x = e.touches[0].pageX;
      el.__tap__.y = e.touches[0].pageY;
    }
  }

  function removeTap(el, tap){
    if (el.__tap__) {
      if (el.__tap__.click) el.removeEventListener('click', tap.observer);
      else {
        window.removeEventListener('scroll', el.__tap__.scroll, true);
        el.removeEventListener('touchmove', tap.observer);
        el.removeEventListener('touchcancel', tap.observer);
        el.removeEventListener('touchend', tap.observer);
      }
      delete el.__tap__;
    }
  }

  function checkTapPosition(el, tap, e){
    var touch = e.changedTouches[0],
        tol = tap.gesture.tolerance;
    if (
      touch.pageX < el.__tap__.x + tol &&
      touch.pageX > el.__tap__.x - tol &&
      touch.pageY < el.__tap__.y + tol &&
      touch.pageY > el.__tap__.y - tol
    ) return true;
  }

  xtag.customEvents.tap = {
    observe: {
      mousedown: document,
      touchstart: document
    },
    gesture: {
      tolerance: 8
    },
    condition: function(e, tap){
      var el = e.target;
      switch (e.type) {
        case 'touchstart':
          if (el.__tap__ && el.__tap__.click) removeTap(el, tap);
          addTap(el, tap, e);
          return;
        case 'mousedown':
          if (!el.__tap__) addTap(el, tap, e);
          return;
        case 'scroll':
        case 'touchcancel':
          removeTap(this, tap);
          return;
        case 'touchmove':
        case 'touchend':
          if (this.__tap__ && !checkTapPosition(this, tap, e)) {
            removeTap(this, tap);
            return;
          }
          return e.type == 'touchend' || null;
        case 'click':
          removeTap(this, tap);
          return true;
      }
    }
  };

  win.xtag = xtag;
  if (typeof define == 'function' && define.amd) define(xtag);
  
  doc.addEventListener('WebComponentsReady', function(){
    xtag.fireEvent(doc.body, 'DOMComponentsLoaded');
  });

})();

/* ../node_modules/x-tag-core/src/core.js end */

/* jshint -W067 */
/* jshint unused: false */
(function(global, undefined) {
    'use strict';

    /**
     * @namespace React
     */
    var React = global.React;

    /**
     * @namespace xblocks
     */
    var xblocks = global.xblocks = {};

    /* xblocks/utils.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.utils = {};

xblocks.utils.REG_TYPE_EXTRACT = /\s([a-zA-Z]+)/;
xblocks.utils.REG_PRISTINE = /^[\$_a-z][\$\w]*$/i;

/* xblocks/utils/support.js begin */
/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.support = {};

xblocks.utils.support.template = ('content' in global.document.createElement('template'));

xblocks.utils.support.msie = (function() {
    var ua = global.navigator.userAgent.toLowerCase();
    var match = /(msie) ([\w.]+)/.exec(ua) || [];

    if (match[1]) {
        return match[2] || '0';
    }

    return false;
}());

xblocks.utils.support.upgradeelements = Boolean(
    global.CustomElements &&
    typeof(global.CustomElements.upgradeAll) === 'function'
);

/* xblocks/utils/support.js end */

/* xblocks/utils/uid.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * Generate unique string
 * @returns {string}
 */
xblocks.utils.uid = function() {
    return Math.floor((1 + Math.random()) * 0x10000000 + Date.now()).toString(36);
};

/* xblocks/utils/uid.js end */

/* xblocks/utils/seq.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @returns {number}
 */
xblocks.utils.seq = (function() {
    var i = 0;
    return function() {
        return ++i;
    };
}());

/* xblocks/utils/seq.js end */

/* xblocks/utils/type.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {*} param
 * @returns {string}
 */
xblocks.utils.type = function(param) {
    if (param === undefined) {
        return 'undefined';
    }

    if (param === null) {
        return 'null';
    }

    var type = typeof(param);

    if (type === 'object') {
        type = Object.prototype.toString.call(param)
            .match(xblocks.utils.REG_TYPE_EXTRACT)[1]
            .toLowerCase();
    }

    if (type === 'number') {
        var paramStr = param.toString();
        if (paramStr === 'NaN') {
            type = 'NaN';

        } else {
            type = paramStr.indexOf('.') === -1 ? 'integer' : 'float';
        }
    }

    return type;
};

/* xblocks/utils/type.js end */

/* xblocks/utils/isEmptyObject.js begin */
/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {*} obj
 * @returns {boolean}
 */
xblocks.utils.isEmptyObject = function(obj) {
    if (xblocks.utils.type(obj) === 'object') {
        for (var key in obj) {
            if (global.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
    }

    return true;
};

/* xblocks/utils/isEmptyObject.js end */

/* xblocks/utils/isWindow.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {*} obj
 * @returns {boolean}
 */
xblocks.utils.isWindow = function(obj) {
    return obj !== null && obj === obj.window;
};

/* xblocks/utils/isWindow.js end */

/* xblocks/utils/isPlainObject.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {*} obj
 * @returns {boolean}
 */
xblocks.utils.isPlainObject = function(obj) {
    if (xblocks.utils.type(obj) !== 'object') {
        return false;
    }

    if (obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    return true;
};

/* xblocks/utils/isPlainObject.js end */

/* xblocks/utils/pristine.js begin */
/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {string} methodName
 * @returns {boolean}
 */
xblocks.utils.pristine = function(methodName) {
    var method = global[methodName];

    if (!methodName || !method) {
        return false;
    }

    if (!xblocks.utils.REG_PRISTINE.test(methodName)) {
        return false;
    }

    var type = typeof(method);

    if (type !== 'function' && type !== 'object') {
        return false;
    }

    var re = new RegExp("function\\s+" + methodName + "\\(\\s*\\)\\s*{\\s*\\[native code\\]\\s*}");

    if (!re.test(method)) {
        return false;
    }

    if (type === 'function') {
        if (!method.valueOf || method.valueOf() !== method) {
            return false;
        }
    }

    return true;
};

/* xblocks/utils/pristine.js end */

/* xblocks/utils/merge.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @returns {object}
 */
xblocks.utils.merge = function() {
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
    var clone;
    var target = arguments[0] || {};
    var i = 1;
    var length = arguments.length;
    var deep = false;
    var type = xblocks.utils.type(target);

    if (type === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    type = xblocks.utils.type(target);

    if (type !== 'object' && type !== 'function') {
        target = {};
    }

    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                if (target === copy) {
                    continue;
                }

                if (deep && copy && (xblocks.utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && xblocks.utils.isPlainObject(src) ? src : {};
                    }

                    target[name] = xblocks.utils.merge( deep, clone, copy );

                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};

/* xblocks/utils/merge.js end */

/* xblocks/utils/lazy.js begin */
/* global xblocks, global */
/* jshint strict: false */

/**
 * @function
 * @private
 */
xblocks.utils._lazy = (function() {
    // setImmediate bad work in IE 10
    if (typeof(global.setImmediate) === 'function' && !xblocks.utils.support.msie) {
        return global.setImmediate;

    } else {
        return function(callback) {
            return global.setTimeout(callback, 0);
        };
    }
}());

/**
 * @param {function} callback
 * @param {*} args
 * @returns {function}
 */
xblocks.utils.lazy = function(callback, args) {
    callback._args = (callback._args || []).concat(args);

    if (!callback._timer) {
        callback._timer = xblocks.utils._lazy(function() {
            callback._timer = 0;
            callback(callback._args.splice(0, callback._args.length));
        });
    }

    return callback;
};

/* xblocks/utils/lazy.js end */

/* xblocks/utils/event.js begin */
/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.event = {};

/**
 * @constructor
 */
xblocks.utils.CustomEvent = (function() {
    if (!xblocks.utils.pristine('CustomEvent')) {
        var CustomEvent = function(event, params) {
            params = params || {};
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
            return evt;
        };

        CustomEvent.prototype = global.Event.prototype;

        return CustomEvent;

    } else {
        return global.CustomEvent;
    }
}());

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {object} params
 */
xblocks.utils.dispatchEvent = function(element, name, params) {
    element.dispatchEvent(new xblocks.utils.CustomEvent(name, params));
};

/**
 * @param {HTMLElement} element
 * @param {Event} event mouseover or mouseout event
 * @param {function} callback
 */
xblocks.utils.event.mouseEnterFilter = function(element, event, callback) {
    var toElement = event.relatedTarget || event.srcElement;

    while (toElement && toElement !== element) {
        toElement = toElement.parentNode;
    }

    if (toElement === element) {
        return;
    }

    return callback.call(element, event);
};

xblocks.utils.event.mouseLeaveFilter = xblocks.utils.event.mouseEnterFilter;

/* xblocks/utils/event.js end */

/* xblocks/utils/equals.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */

xblocks.utils._equal = {
    'array': function(x, y) {
        if (x === y) {
            return true;
        }

        var i = 0;
        var l = x.length;

	    if (l !== y.length) {
            return false;
        }

	    for (; i < l; i++) {
		    if (!xblocks.utils.equals(x[i], y[i])) {
                return false;
            }
	    }

	    return true;
    },

    'object': function(x, y) {
        if (x === y) {
		    return true;
        }

        var i;

        for (i in x) {
    		if (y.hasOwnProperty(i)) {
    			if (!xblocks.utils.equals(x[i], y[i])) {
                    return false;
                }

    		} else {
    			return false;
    		}
    	}

        for (i in y) {
    		if (!x.hasOwnProperty(i)) {
    			return false;
    		}
    	}

    	return true;
    },

    'date': function(x, y) {
        return x.getTime() === y.getTime();
    },

    'regexp': function(x, y) {
        return x.toString() === y.toString();
    },

    'function': function(x, y) {
        return x.toString() === y.toString();
    }
};

xblocks.utils.equals = function(x, y) {
    if (x === y) {
        return true;
    }

    var xType = xblocks.utils.type(x);
    var yType = xblocks.utils.type(y);

    if (xType !== yType) {
        return false;
    }

    return xblocks.utils._equal.hasOwnProperty(xType) ?
        xblocks.utils._equal[xType](x, y) :
        x == y;
};

/* xblocks/utils/equals.js end */

/* xblocks/utils/filterObject.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {object} from
 * @param {function} [callback]
 * @returns {object}
 */
xblocks.utils.filterObject = function(from, callback) {
    var obj = {};
    var props = {};
    var fill = false;

    Object.keys(from).forEach(function(property) {
        var descr = Object.getOwnPropertyDescriptor(from, property);
        if (callback && callback(property, descr)) {
            props[property] = descr;
            fill = true;
        }
    });

    if (fill) {
        Object.defineProperties(obj, props);
    }

    return obj;
};

/* xblocks/utils/filterObject.js end */

/* xblocks/utils/mapObject.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {object} from
 * @param {function} [callback]
 * @returns {object}
 */
xblocks.utils.mapObject = function(from, callback) {
    var obj = {};
    var props = {};
    var fill = false;

    Object.keys(from).forEach(function(property) {
        var descr = Object.getOwnPropertyDescriptor(from, property);
        var map = callback && callback(property, descr);
        if (xblocks.utils.type(map) === 'object') {
            props[map.name] = map.descr;
            fill = true;
        }
    });

    if (fill) {
        Object.defineProperties(obj, props);
    }

    return obj;
};

/* xblocks/utils/mapObject.js end */

/* xblocks/utils/upgradeElements.js begin */
/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.upgradeElements = (function() {
    if (xblocks.utils.support.upgradeelements) {
        return global.CustomElements.upgradeAll;
    } else {
        return function() {};
    }
}());

/* xblocks/utils/upgradeElements.js end */

/* xblocks/utils/contentNode.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.utils.contentNode = function(node) {
    var element;

    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

        if (!element) {
            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
        }
    }

    return element || node;
};

/* xblocks/utils/contentNode.js end */

/* xblocks/utils/propTypes.js begin */
/* global xblocks */
/* jshint strict: false */

/**
 * @param {string} tagName
 * @returns {object}
 */
xblocks.utils.propTypes = function(tagName) {
    var view = xblocks.view.get(tagName);
    return (view && (view.propTypes || (view.originalSpec && view.originalSpec.propTypes))) || {};
};

/* xblocks/utils/propTypes.js end */

/* xblocks/utils/tmpl.js begin */
/* global xblocks */
/* jshint strict: false */

(function() {
    var cache = {};

    /**
     * @param {string} str
     * @param {object} data
     * @returns {string}
     * @see http://ejohn.org/blog/javascript-micro-templating/
     */
    xblocks.utils.tmpl = function(str, data) {
        if (!cache.hasOwnProperty(str)) {
            /* jshint -W054 */
            cache[str] = new Function('obj',
               "var p=[],print=function(){p.push.apply(p,arguments);};" +
               "with(obj){p.push('" +
               str.replace(/[\r\t\n]/g, " ")
                   .split("<%").join("\t")
                   .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                   .replace(/\t=(.*?)%>/g, "',$1,'")
                   .split("\t").join("');")
                   .split("%>").join("p.push('")
                   .split("\r").join("\\'") +
                   "');}return p.join('');");
        }

        return data ? cache[str](data) : cache[str];
    };

}());

/* xblocks/utils/tmpl.js end */

/* xblocks/utils/findReactContainerForID.js begin */
/* global xblocks, React */
/* jshint strict: false */

/**
 * @param {String} rootNodeID
 * @returns {HTMLElement}
 */
xblocks.utils.findReactContainerForID = function(rootNodeID) {
    return React.__internals.Mount.findReactContainerForID(rootNodeID);
};

/* xblocks/utils/findReactContainerForID.js end */


/* xblocks/utils.js end */

    /* xblocks/dom.js begin */
/* global xblocks, React */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.dom = {
    attrs: {
        /**
         * @type {string[]}
         */
        ARRTS_BOOLEAN: [
            'active',
            'autofocus',
            'checked',
            'defer',
            'disabled',
            'ismap',
            'multiple',
            'readonly',
            'required',
            'selected',
            'xb-static'
        ],

        /**
         * @type {object}
         */
        XB_ATTRS: {
            STATIC: 'xb-static'
        }
    }
};

/**
 * @param {HTMLElement} element
 * @param {object} attrs
 * @return {object}
 */
xblocks.dom.attrs.get = function(element, attrs) {
    if (element.nodeType !== 1 || !element.hasAttributes()) {
        return attrs;
    }

    for (var attrName in attrs) {
        if (attrs.hasOwnProperty(attrName) && element.hasAttribute(attrName)) {
            if (typeof(attrs[attrName]) === 'boolean') {
                attrs[attrName] = xblocks.dom.attrs.valueConversion(
                    attrName,
                    element.getAttribute(attrName),
                    React.PropTypes.bool
                );

            } else {
                attrs[attrName] = element.getAttribute(attrName);
            }
        }
    }

    return attrs;
};

/**
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    var attrs = {};

    if (element.nodeType === 1 && element.hasAttributes()) {
        Array.prototype.forEach.call(element.attributes, _domAttrsToObject, attrs);
    }

    return attrs;
};

/**
 * @param {string} prop
 * @param {*} value
 * @param {function} [type]
 * @returns {*}
 */
xblocks.dom.attrs.valueConversion = function(prop, value, type) {
    if (!type) {
        if (value === 'true' || value === 'false' || xblocks.dom.attrs.ARRTS_BOOLEAN.indexOf(prop) !== -1) {
            type = React.PropTypes.bool;
        }
    }

    switch (type) {
        case React.PropTypes.bool:
            return (value === true || value === '' || prop === value || value === 'true');
        case React.PropTypes.string:
            return String(value);
        case React.PropTypes.number:
            return Number(value);
        default:
            return value;
    }
};

/**
 * @param {object} props
 * @param {object} [propTypes]
 * @returns {object}
 */
xblocks.dom.attrs.typeConversion = function(props, propTypes) {
    propTypes = typeof(propTypes) === 'object' ? propTypes : {};

    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            props[prop] = xblocks.dom.attrs.valueConversion(prop, props[prop], propTypes[prop]);
        }
    }

    return props;
};

function _domAttrsToObject(attr) {
    this[attr.nodeName] = attr.value;
}

/* xblocks/dom.js end */

    /* xblocks/tag.js begin */
/* global xblocks, global */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.tag = global.xtag;

/* xblocks/tag.js end */

    /* xblocks/view.js begin */
/* global xblocks, React */
/* jshint strict: false */

/**
 * @module xblocks.view
 */
xblocks.view = {};

/**
 * @param {object} component
 */
xblocks.view.create = function(component) {
    component = Array.isArray(component) ? component : [component];

    component.unshift(true, {
        _templatePrepare: function(tmplString) {
            return tmplString;
        }
    });

    component.push({
        propTypes: {
            '_uid': React.PropTypes.renderable,
            'children': React.PropTypes.renderable,
            'xb-static': React.PropTypes.bool
        },

        template: function(ref, props) {
            var rootNode = xblocks.utils.findReactContainerForID(this._rootNodeID);
            var xtmpl = rootNode && rootNode.xuid && rootNode.xtmpl;

            if (xtmpl && xtmpl.hasOwnProperty(ref)) {
                props = props || {};
                props.dangerouslySetInnerHTML = {
                    __html: this._templatePrepare(xtmpl[ref])
                };

                return React.DOM.div(props);
            }

            return null;
        }
    });

    return React.createClass(xblocks.utils.merge.apply({}, component));
};

/**
 * @param {string} blockName
 * @param {object} component
 * @throws
 */
xblocks.view.register = function(blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        throw 'Specified item "' + blockName + '" is already defined';
    }

    React.DOM[blockName] = xblocks.view.create(component);
    return React.DOM[blockName];
};

/**
 * @param {string} blockName
 * @returns {*}
 */
xblocks.view.get = function(blockName) {
    return React.DOM[blockName];
};

/* xblocks/view.js end */

    /* xblocks/block.js begin */
/* global xblocks */
/* jshint strict: false */

var _blockCommon = {
    lifecycle: {
        created: function() {
            this.xtagName = this.tagName.toLowerCase();
            this.xtmpl = {};
            this.xuid = xblocks.utils.seq();
            this.xprops = xblocks.utils.propTypes(this.xtagName);
            this._inserted = false;
        },

        inserted: function() {
            if (this._inserted) {
                return;
            }

            this._inserted = true;

            // asynchronous read content
            // <xb-test><script>...</script><div>not found</div></xb-test>
            if (this.getElementsByTagName('script').length) {
                xblocks.utils.lazy(_blockLazyInstantiation, this);

            } else {
                _blockInstantiation(this);
            }
        },

        removed: function() {
            this._inserted = false;

            // replace initial content after destroy react component
            // fix:
            // element.parentNode.removeChild(element);
            // document.body.appendChild(element);
            if (this.xblock) {
                var content = this.content;
                this.xblock.destroy();
                this.xblock = undefined;
                this.content = content;
            }
        },

        attributeChanged: function(attrName, oldValue, newValue) {
            // removeAttribute('xb-static')
            if (attrName === xblocks.dom.attrs.XB_ATTRS.STATIC &&
                newValue === null &&
                this.xblock &&
                !this.mounted) {

                this.xblock._repaint();
            }
        }
    },

    accessors: {
        // check mounted react
        mounted: {
            get: function() {
                return Boolean(this.xblock && this.xblock._isMountedComponent());
            }
        },

        content: {
            get: function() {
                if (this.mounted) {
                    // FIXME bad way to get children
                    return this.xblock._component.props.children;
                }

                return xblocks.utils.contentNode(this).innerHTML;
            },

            set: function(content) {
                if (this.mounted) {
                    this.xblock.update({ 'children': content });

                } else {
                    xblocks.utils.contentNode(this).innerHTML = content;
                    this.upgrade();
                }
            }
        },

        // getting object attributes
        attrs: {
            get: function() {
                return xblocks.dom.attrs.toObject(this);
            }
        },

        state: {
            get: function() {
                var props = {};
                var elementProps = xblocks.tag.tags[this.xtagName].accessors;

                for (var prop in elementProps) {
                    if (this.xprops.hasOwnProperty(prop) &&
                        elementProps.hasOwnProperty(prop) &&
                        !_blockCommon.accessors.hasOwnProperty(prop)) {

                        props[prop] = this[prop];
                    }
                }

                props = xblocks.utils.merge({}, xblocks.dom.attrs.toObject(this), props);
                xblocks.dom.attrs.typeConversion(props, this.xprops);
                return props;
            }
        }
    },

    methods: {
        upgrade: function() {
            xblocks.utils.upgradeElements(this);
        },

        cloneNode: function(deep) {
            // not to clone the contents
            var node = Node.prototype.cloneNode.call(this, false);
            node.xtmpl = this.xtmpl;
            node._inserted = false;

            if (deep) {
                node.content = this.content;
            }

            return node;
        }
    }
};

function _blockTmplCompile(tmplElement) {
    this.xtmpl[tmplElement.getAttribute('ref')] = tmplElement.innerHTML;
}

function _blockInstantiation(element) {
    if (element.hasChildNodes()) {
        Array.prototype.forEach.call(
            element.querySelectorAll('script[type="text/x-template"][ref],template[ref]'),
            _blockTmplCompile,
            element
        );
    }

    element.xblock = xblocks.element.create(element);
}

function _blockLazyInstantiation(elements) {
    elements.forEach(_blockInstantiation);
}

/**
 * @param {string} blockName
 * @param {?object} options
 * @returns {HTMLElement}
 */
xblocks.create = function(blockName, options) {
    options = Array.isArray(options) ? options : [options];
    options.unshift(true, {});
    options.push(_blockCommon);
    return xblocks.tag.register(blockName, xblocks.utils.merge.apply({}, options));
};

/* xblocks/block.js end */

    /* xblocks/element.js begin */
/* global xblocks, global, React */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @constructor
 */
xblocks.element = function(node) {
    node.xblock = this;
    this._node = node;
    this._init(node.state, node.content, this._callbackInit);
};

/**
 * @param {HTMLElement} node
 * @returns {xblocks.element}
 */
xblocks.element.create = function(node) {
    return new xblocks.element(node);
};

/**
 * @type {HTMLElement}
 * @private
 */
xblocks.element.prototype._node = null;

/**
 * @type {Constructor}
 * @private
 */
xblocks.element.prototype._component = null;

/**
 * @type {MutationObserver}
 * @private
 */
xblocks.element.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM
 */
xblocks.element.prototype.destroy = function() {
    React.unmountComponentAtNode(this._node);
    this.unmount();
};

/**
 * Unmounts a component
 */
xblocks.element.prototype.unmount = function() {
    if (this._observer) {
        this._observer.disconnect();
    }

    if (this._isMountedComponent()) {
        this._component.unmountComponent();
        this._component = null;
    }
};

/**
 * @param {object} [props]
 * @param {Array} [removeProps]
 * @param {function} [callback]
 */
xblocks.element.prototype.update = function(props, removeProps, callback) {
    if (!this._isMountedComponent()) {
        return;
    }

    var nextProps = this._node.state;
    var action = 'setProps';

    xblocks.utils.merge(true, nextProps, props);

    // merge of new and current properties
    // and the exclusion of remote properties
    if (Array.isArray(removeProps) && removeProps.length) {
        action = 'replaceProps';
        var currentProps = this._getCurrentProps();
        nextProps = xblocks.utils.merge(true, currentProps, nextProps);
        nextProps = xblocks.utils.filterObject(nextProps, function(name) {
            return (removeProps.indexOf(name) === -1);
        });
    }

    if (nextProps.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this._repaint(callback);

    } else {
        xblocks.dom.attrs.typeConversion(nextProps, this._node.xprops);
        this._component[action](nextProps, this._callbackUpdate.bind(this, callback));
    }
};

/**
 * @param {object} [props]
 * @param {string} [children]
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._init = function(props, children, callback) {
    if (this._isMountedComponent()) {
        return;
    }

    props._uid = this._node.xuid;
    xblocks.dom.attrs.typeConversion(props, this._node.xprops);

    var proxyConstructor = xblocks.view.get(this._node.xtagName)(props, children);

    if (props.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this.unmount();
        this._node.innerHTML = React.renderComponentToStaticMarkup(proxyConstructor);
        this._node.upgrade();

        if (callback) {
            callback.call(this);
        }

    } else {
        var that = this;
        this._component = React.renderComponent(
            proxyConstructor,
            this._node,
            function() {
                that._component = this;
                that._callbackRender(callback);
            }
        );
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._repaint = function(callback) {
    var props = xblocks.utils.merge(true, this._node.state, this._getCurrentProps());
    var children = this._node.content;
    this.destroy();
    this._init(props, children, this._callbackRepaint.bind(this, callback));
};

/**
 * @private
 */
xblocks.element.prototype._callbackInit = function() {
    xblocks.utils.dispatchEvent(this._node, 'xb-created');
    xblocks.utils.lazy(_elementGlobalInitEvent, this._node);
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRepaint = function(callback) {
    xblocks.utils.dispatchEvent(this._node, 'xb-repaint');
    xblocks.utils.lazy(_elementGlobalRepaintEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRender = function(callback) {
    this._node.upgrade();

    if (!this._observer) {
        this._observer = new MutationObserver(this._callbackMutation.bind(this));
    }

    this._observer.observe(this._node, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false,
        attributeFilter: Object.keys(this._node.xprops)
    });

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {MutationRecord[]} records
 * @private
 */
xblocks.element.prototype._callbackMutation = function(records) {
    if (!this._isMountedComponent()) {
        return;
    }

    // full repaint
    if (records.some(_elementCheckNodeChange)) {
        this._repaint();

    } else if (records.some(_elementCheckAttributesChange)) {

        var removeAttrs = records
            .filter(_elementFilterAttributesRemove, this)
            .map(_elementMapAttributesName);

        this.update(null, removeAttrs);
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackUpdate = function(callback) {
    this._node.upgrade();

    xblocks.utils.dispatchEvent(this._node, 'xb-update');
    xblocks.utils.lazy(_elementGlobalUpdateEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 *
 * @returns {boolean}
 * @private
 */
xblocks.element.prototype._isMountedComponent = function() {
    return Boolean(this._component && this._component.isMounted());
};

/**
 * @returns {?object}
 * @private
 */
xblocks.element.prototype._getCurrentProps = function() {
    return this._isMountedComponent() ? this._component.props : null;
};

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
function _elementCheckNodeChange(record) {
    return (record.type === 'childList');
}

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
function _elementCheckAttributesChange(record) {
    return (record.type === 'attributes');
}

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
function _elementFilterAttributesRemove(record) {
    return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
}

/**
 * @param {MutationRecord} record
 * @returns {string}
 * @private
 */
function _elementMapAttributesName(record) {
    return record.attributeName;
}

/**
 * @param {array} records
 * @private
 */
function _elementGlobalInitEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-created', { detail: { records: records } });
}

/**
 * @param {array} records
 * @private
 */
function _elementGlobalRepaintEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-repaint', { detail: { records: records } });
}

/**
 * @param {array} records
 * @private
 */
function _elementGlobalUpdateEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-update', { detail: { records: records } });
}

/* xblocks/element.js end */


}(function() {
    return this || (1, eval)('this');
}()));
