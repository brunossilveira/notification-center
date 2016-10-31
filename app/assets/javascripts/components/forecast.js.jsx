class ForecastWeekDayWrapper extends React.Component {
  componentDidMount() {
    this.props.skycons.add('week_day_'+this.props.row, this.props.data.icon)
  }

  render() {
    var weekDay = new Date(this.props.data.time*1000);
    var days = ['Sun','Mon','Tues','Wed','Thrus','Fri','Sat']

    return (
      <li className={'week-day'}>
        <span>{ days[weekDay.getDay()] }</span>
        <canvas id={"week_day_" + this.props.row } className={"icon"} width="50" height="50"></canvas>
        <span>{ Math.floor(this.props.data.temperatureMax) + '\u2103' }</span>
        <span>{ Math.floor(this.props.data.temperatureMin) + '\u2103' }</span>
      </li>
    );
  }
}

class ForecastDaily extends React.Component {
  componentDidMount() {
    this.props.data.skycons.add("today_icon", this.props.data.currently.icon);
  }

  render() {
    return (
      <div id="today">
        <div className={"temperature"}>{Math.floor(this.props.data.temperature)}</div>
        <canvas id="today_icon" className={"icon"} width="128" height="128"></canvas>
        <div className={"summary"}>{this.props.data.dailySummary}</div>
        <div className={"probability"}>{this.props.data.precipProbability}</div>
      </div>
    );
  }
}

var Forecast = React.createClass({
  getInitialState: function() {
    return {
      currentlySummary: '',
      dailySummary: '',
      precipProbability: '',
      skycons: new Skycons({"color": "white"}),
      daily: [],
      currently: {}
    }
  },
  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, this.props.coordinates, function (data) {
      console.log(data);
      this.setState({
        daily: data.daily.data,
        temperature: data.currently.apparentTemperature,
        currentlySummary: data.currently.summary,
        dailySummary: data.daily.summary,
        precipProbability: (data.currently.precipProbability * 100) + '%',
        currently: data.currently
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    return (
      <div id="weather">
        <ForecastDaily data={this.state} />

        <div id="week">
          <ul>
            {this.state.daily.map((data, k) => (
              <ForecastWeekDayWrapper key={k} row={k} data={data} skycons={this.state.skycons}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
});
