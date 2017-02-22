'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flowRenderer = require('../flow-renderer');

var _flowRenderer2 = _interopRequireDefault(_flowRenderer);

var _flowRendererHero = require('./flow-renderer-hero');

var _flowRendererHero2 = _interopRequireDefault(_flowRendererHero);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for rendering a text card.
 */
var FlowRendererCarousel = function (_FlowRenderer) {
  _inherits(FlowRendererCarousel, _FlowRenderer);

  function FlowRendererCarousel(settings) {
    _classCallCheck(this, FlowRendererCarousel);

    var _this = _possibleConstructorReturn(this, (FlowRendererCarousel.__proto__ || Object.getPrototypeOf(FlowRendererCarousel)).call(this, settings));

    _this.cardType = 'carousel';
    return _this;
  }

  /**
   * Transform the given card to the message builder.
   * 
   * @param { Object } session Chat session for building the message.
   * @param { Object } card Card to be transformed.
   */


  _createClass(FlowRendererCarousel, [{
    key: 'transform',
    value: function transform(session, card) {
      var result = new this.builder.Message(session).textFormat(this.builder.TextFormat.xml).attachmentLayout(this.builder.attachmentLayout.carousel);
      var arr = [];
      for (var i = 0; i < card.cards.length; i++) {
        arr.push(_flowRendererHero2.default.buildCard(this.builder, session, card.cards[i]));
      }
      result.attachments(arr);
      return result;
    }
  }]);

  return FlowRendererCarousel;
}(_flowRenderer2.default);

exports.default = FlowRendererCarousel;