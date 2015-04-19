// tutorial1.js
var CommentBox = React.createClass({
   getInitialState: function(){
    return {data:[]};
   }, 
   loadCommentsFromServer: function(){
        $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   },

   componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
        <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data}/>
            <CommentForm/>

        </div>
    );
  }
});




// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(elem) {
        return (
                <Comment author={elem.author}>
                    {elem.text}
                </Comment>
            );
    });

    return (
            <div className="commentList">{commentNodes}</div>
        );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});



React.render(
  <CommentBox url="data.json" pollInterval={2000}/>,
  document.getElementById('content')
);