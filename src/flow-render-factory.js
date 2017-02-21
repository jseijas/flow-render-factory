import _ from 'lodash';
import FlowRendererText from './renderers/flow-renderer-text';

/**
 * Class for the Flow Renderer Factory.
 */
class FlowRenderFactory {

  /**
   * Constructor of the class.
   * 
   * @param { Object } settings Settings for the instance.
   */
  constructor(settings) {
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
  addRendererByChannel(channel, renderer) {
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
  addRenderer(renderer) {
    let channels = renderer.channels || ['default'];
    if (!_.isArray(channels)) {
      channels = [channels];
    }
    for (let i = 0; i < channels.length; i++) {
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
  getRenderer(channel, cardType) {
    let renderer;
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
  addDefaultRenderers() {
    this.addRenderer(new FlowRendererText(this.settings));
  }

  /**
   * Get the channel name from the session instance.
   */
  getChannel(session) {
    return session.message.source;
  }

  /**
   * Render the card.
   */
  render(session, card, locale, variables) {
    let channel = this.getChannel(session);
    let renderer = this.getRenderer(channel, card.cardType);
    if (!renderer) {
      throw new Error('Error: renderer not found');
    }
    return renderer.render(session, card, locale, variables);
  }
}

export default FlowRenderFactory;