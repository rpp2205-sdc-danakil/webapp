import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';

// this class handles each answer for the specific product
class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: props.answer.helpfulness,
      isYesClicked: false,
      isReported: false
    }

    this.handleReport = this.handleReport.bind(this);
    this.handleIncreaseCounts = this.handleIncreaseCounts.bind(this);
    this.handleDateFormat = this.handleDateFormat.bind(this);
  }

  handleReport(e) {
    this.props.interaction(e.target);
    this.setState({
      isReported: true
    }, () => {
      axios.put(`/qa/answers/${this.props.answer.answer_id}/report`)
      .then(data => {
        if (data.status !== 204) {
          throw err;
        }
      })
      .catch(err => {
        console.log('failed to increment the count');
      });
    });
  }

  handleIncreaseCounts(e) {
    this.props.interaction(e.target)
    this.setState({
      isYesClicked: true,
      helpfulness: this.state.helpfulness + 1
    }, () => {
      axios.put(`/qa/answers/${this.props.answer.answer_id}/helpful`)
      .then(data => {
        if (data.status !== 204) {
          throw err;
        }
      })
      .catch(err => {
        console.log('failed to increment the count');
      });
    });
  }

  handleDateFormat(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let d = new Date(date);
    let day = d.getDate();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  render() {
    let { body, answerer_name, date } = this.props.answer;

    return (
      <div className="answer_container">
        <div className="answer_symbol">A: <span className="answer_text">{body}</span></div>
        <div className="answer_sub">
          <div className="by">by</div>
          <span className={answerer_name === "Seller" ? 'seller' : 'answerer'}>{answerer_name === "Seller" ? "Seller" : answerer_name}</span>
          <div className="answer_date">{this.handleDateFormat(date)}</div>
          <div className="border_line"></div>
          <div className="helpful_text">Helpful?</div>
          <button className="yes_button"
            disabled={this.state.isYesClicked}
            onClick={this.handleIncreaseCounts}>Yes
          </button>
          <div className="helpfulness_number">({this.state.helpfulness})</div>
          {this.state.isReported ?
            <button disabled={this.state.isReported}
              className="report_button"
              role="button">Reported
            </button> :
            <button className="report_button"
              role="button"
              onClick={this.handleReport}>Report
            </button>}
        </div>
      </div>
    )
  }
}

export default withClickData(Answer, 'questions_answers');
