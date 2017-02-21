'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flowRendererText = require('./renderers/flow-renderer-text');

var _flowRendererText2 = _interopRequireDefault(_flowRendererText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the Flow Renderer Factory.
 */
var FlowRenderFactory = function () {

  /**
   * Constructor of the class.
   * 
   * @param { Object } settings Settings for the instance.
   */
  function FlowRenderFactory(settings) {
    _classCallCheck(this, FlowRenderFactory);

    this.settings = settings;
    this.renderers = {};
    this.addDefaultRenderers();
  }

  /**
   * Add a renderer to a channel.
   * 
   * @param { String } channel Channel name.
   * @param { Object } renderer Renderer instance.
   */


  _createClass(FlowRenderFactory, [{
    key: 'addRendererByChannel',
    value: function addRendererByChannel(channel, renderer) {
      if (!this.renderers[channel]) {
        this.renderers[channel] = {};
      }
      this.renderers[channel][renderer.cardType] = renderer;
    }

    /**
     * Add a renderer. The renderer must include the information about
     * then channels and the card type.
     * 
     * @param { Object } renderer Renderer instance.
     */

  }, {
    key: 'addRenderer',
    value: function addRenderer(renderer) {
      var channels = renderer.channels || ['default'];
      if (!_lodash2.default.isArray(channels)) {
        channels = [channels];
      }
      for (var i = 0; i < channels.length; i++) {
        this.addRendererByChannel(channels[i], renderer);
      }
    }

    /**
     * Get a renderer given the channel and the card type.
     * 
     * @param { String } channel Channel name.
     * @param { String } cardType Type of the card.
     * @returns { Object } Renderer for this channel and card type.
     */

  }, {
    key: 'getRenderer',
    value: function getRenderer(channel, cardType) {
      var renderer = void 0;
      if (this.renderers[channel]) {
        renderer = this.renderers[channel][cardType];
      }
      if (!renderer) {
        if (this.renderers['default']) {
          renderer = this.renderers['default'][cardType];
        }
      }
      return renderer;
    }

    /**
     * Adds the default renderers to the factory.
     */

  }, {
    key: 'addDefaultRenderers',
    value: function addDefaultRenderers() {
      this.addRenderer(new _flowRendererText2.default(this.settings));
    }

    /**
     * Get the channel name from the session instance.
     */

  }, {
    key: 'getChannel',
    value: function getChannel(session) {
      return session.message.source;
    }

    /**
     * Render the card.
     */

  }, {
    key: 'render',
    value: function render(session, card, locale, variables) {
      var channel = this.getChannel(session);
      var renderer = this.getRenderer(channel, card.cartType);
      if (!renderer) {
        throw new Error('Error: renderer not found');
      }
      return renderer.render(session, card, locale, variables);
    }
  }]);

  return FlowRenderFactory;
}();

exports.default = FlowRenderFactory;