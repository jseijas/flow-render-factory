import FlowRenderer from '../flow-renderer';
import FlowRendererHero from './flow-renderer-hero';

/**
 * Class for rendering a text card.
 */
class FlowRendererCarousel extends FlowRenderer {
  constructor(settings) {
    super(settings);
    this.cardType = 'carousel';
  }

  /**
   * Transform the given card to the message builder.
   * 
   * @param { Object } session Chat session for building the message.
   * @param { Object } card Card to be transformed.
   */
  transform(session, card) {
    let result = new this.builder.Message(session)
      .textFormat(this.builder.TextFormat.xml)
      .attachmentLayout(this.builder.attachmentLayout.carousel);
    let arr = [];
    for (let i = 0; i < card.cards.length; i++) {
      arr.push(FlowRendererHero.buildCard(this.builder, session, card.cards[i]));
    }
    result.attachments(arr);
    return result;
  }
}

export default FlowRendererCarousel;

