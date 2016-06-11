var lookUp = {
    
    "FIFA" : 0,
    "Ping Pong" : 1,
    "Pool" : 2
}

var scores = [
    {
    "id" : 0, 
    "name" : "FIFA",
    "data" : [
        {"id" : 1, "PlayerOne": "Nisarga", "PlayerTwo": "Jon", "Winner": "Nisarga"},
        {"id" : 2, "PlayerOne": "Joe", "PlayerTwo": "Jon", "Winner": "Joe"}
    ]},
    {
    "id" : 1, 
    "name" : "Ping Pong",
    "data" : [
        {"id" : 1, "PlayerOne": "Bob", "PlayerTwo": "Jon", "Winner": "Nisarga"},
        {"id" : 2, "PlayerOne": "Joe", "PlayerTwo": "Jon", "Winner": "Joe"}
    ]},
    {
     "id" : 2, 
    "name" : "Pool",
    "data" : [
        {"id" : 1, "PlayerOne": "Joanna", "PlayerTwo": "Jon", "Winner": "Jon"},
        {"id" : 2, "PlayerOne": "Joe", "PlayerTwo": "Jon", "Winner": "Joe"}
    ]}
];

var Game = React.createClass({
    
    render : function () {
        
        return (
            <div className="game">
                <span>{this.props.data.PlayerOne} </span>
                vs
                <span> {this.props.data.PlayerTwo} </span><br />
                Winner:
                <span> {this.props.data.Winner}</span>
                <hr />
            </div>
        )
    }
    
});

var CategoryView = React.createClass({
    
    render : function() {
        
        var scoreNodes = this.props.category.data.map(function(game){
            
            return (
                <Game data={game} key={game.id}/>
            )
            
        });
        return (
            <div className="category">
                <h4>{this.props.category.name}</h4>
                {scoreNodes}
            </div>
        )
    }
});

var RenderScores = React.createClass({
    
    getInitialState : function () {
        
        return {scores : this.props.scores}
    },
    
    handleSubmit : function (game, name) {
        
        console.log("gets here!");
        
        
        scores[lookUp[name]].data = scores[lookUp[name]].data.concat(game);
        
        this.setState({ scores : scores})
    },
    render : function () {
        var views = this.state.scores.map(function(category){
            
            return (
                <CategoryView category={category} key={category.id} />
            )
            
        });
        
        return (
            <div className="views">
                <AddScoreForm handleSubmit = {this.handleSubmit} />
                {views}
            </div>
        )
    }
});

var AddScoreForm = React.createClass({
    getInitialState : function() {
            
        return {
            name: "FIFA",
            PlayerOne : "",
            PlayerTwo : "",
            Winner: ""
        }
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    handlePlayerOneChange: function(e) {
        this.setState({PlayerOne: e.target.value});
    },
    handlePlayerTwoChange: function(e) {
        this.setState({PlayerTwo: e.target.value});
    },
    handleWinnerChange: function(e) {
        this.setState({Winner: e.target.value});
        console.log(this.state);
    },
    handleSubmit : function(e) {
        
        e.preventDefault();
        
        var name = this.state.name;
        var game =  {
            id : Date.now(),
            PlayerOne : this.state.PlayerOne,
            PlayerTwo : this.state.PlayerTwo,
            Winner : this.state.Winner
        };
        
        if (!this.state.PlayerOne || !this.state.PlayerTwo || !this.state.Winner) {
          return;
        }

        this.props.handleSubmit(game, name);
        
        this.setState({
            name: "FIFA",
            data:{
                PlayerOne : "",
                PlayerTwo : "",
                Winner: ""
            }
        });
        
    },
    render : function () {
        
        
        return (
            <div className="addScore">
                <form  className="commentForm" onSubmit={this.handleSubmit}>
                    <label>Select a Category</label>
                    <select className="browser-default" onChange={this.handleNameChange}>
                        <option value="FIFA">FIFA</option>
                        <option value="Ping Pong">Ping Pong</option>
                        <option value="Pool">Pool</option>
                    </select><br />
                    <input type="text" placeholder="Player One" value={this.state.PlayerOne} onChange={this.handlePlayerOneChange} />
                    <br />
                    <input type="text" placeholder="Player Two" value={this.state.PlayerTwo} onChange={this.handlePlayerTwoChange}/>
                    <br />
                    <input type="text" placeholder="Winner" value={this.state.Winner} onChange={this.handleWinnerChange} />
                    <br />
                    <input className="btn-floating btn-large waves-effect waves-light blue" type="submit" value="+" />
                </form>
            </div>
        )
    }
    
})

var ScoresApp = React.createClass({
  getInitialState : function() {
      return {data: scores};
  },

  render: function() {
    return (
        <div className="appView">
            <h3>Welcome to Game Room Scores</h3>
            <RenderScores scores={this.state.data} />
        </div>
    )
  }
});

ReactDOM.render(
    <ScoresApp />,
    document.getElementById('app')
);