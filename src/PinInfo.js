import React, {PureComponent} from 'react';

export default class PinInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.lat}, ${info.long}`;

    return (
      <div>
        <div>
          {displayName} |{' '}
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
        </div>
        <img width={240} alt="" src={info.image} />
      </div>
    );
  }
}
