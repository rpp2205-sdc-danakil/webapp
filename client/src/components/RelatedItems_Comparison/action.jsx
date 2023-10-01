import withClickData from '../hoc_click_data.jsx';

function Action (props) {

  return(
    props.actionButton ? (
      <div id="action">
        <i className="fa-regular fa-star star" onClick={ (e) => {props.showModal(props.info); props.interaction(e.currentTarget)}}></i>
      </div>
    ) : (
      <div id="action">
        <i id={props.info.id} className="fa-regular fa-circle-xmark" onClick={(e) => {props.removeProd(e); props.interaction(e.currentTarget)}}></i>
      </div>
    )
  )
}

export default withClickData(Action, 'Related Items & Comparison');
