import ModalWindow from './ModalWindow.jsx';
import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';

// this class handles each question for the specific product
class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulness: props.question.question_helpfulness,
      isFormShown: false,
      isYesClicked: false,
    }

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleIncreaseCounts = this.handleIncreaseCounts.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  handleAddAnswer(e) {
    this.props.interaction(e.target);
    this.setState({
      isFormShown: true
    });
  }

  closeForm() {
    this.setState({
      isFormShown: false
    });
  }

  handleIncreaseCounts(e) {
    this.props.interaction(e.target);
    this.setState({
      isYesClicked: true,
      helpfulness: this.state.helpfulness + 1
    }, () => {
      axios.put(`/qa/questions/${this.props.question.question_id}/helpful`)
      .then(data => {
        if (data.status !== 204) {
          throw err;
        }
      })
      .catch(err => {
        console.log('failed to increment counts')
      })
    });
  }

  render() {
    return (
      <div className="question_container">
        <p className="question">Q: {this.props.question.question_body}</p>
        <div className="helpful_container">
          <div className="helpful_text">Helpful?</div>
          <button className="yes_button"
            disabled={this.state.isYesClicked}
            onClick={this.handleIncreaseCounts}>Yes
          </button>
          <div className="helpfulness_number">({this.state.helpfulness})</div>
          <div className="border_line"></div>
          <button
            className="add_answer_button"
            onClick={this.handleAddAnswer}>Add Answer
          </button>
        </div>
        {this.state.isFormShown &&
          <ModalWindow
            productId={this.props.productId}
            questionId={this.props.question.question_id}
            questionBody={this.props.question.question_body}
            productName={this.props.productName}
            isFormShown={this.state.isFormShown}
            closeForm={this.closeForm}
          />}
      </div>
    )
  }
}

export default withClickData(Question, 'questions_answers');